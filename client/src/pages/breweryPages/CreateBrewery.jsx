import { useState } from 'react';
import { Container, Box, Typography, Button, Grid } from '@mui/material';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import CreateBreweryForm from '../../components/brewery_components/CreateBreweryForm';

const CreateBrewery = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    name: '',
    description: '',
    address: '',
  });
  const [formErrors, setFormErrors] = useState({});

  const onFormSubmit = (event) => {
    event.preventDefault();
    const validateData = async () => {
      const errors = {};

      if (!formValues.name) {
        errors.name = 'Brewery name is required.';
      }

      if (!formValues.description) {
        errors.description = 'Description is required.';
      }
      if (formValues.description.length < 20) {
        console.log(formValues.description.length);
        errors.description = 'Description must be greater than 20 characters.';
      }

      if (!formValues.address) {
        errors.address = 'Address is required.';
      }
      console.log(errors);
      if (Object.keys(errors).length) {
        setFormErrors(errors);
        throw new Error('Form validation failed.');
      }
    };

    const handleSubmit = () => {
      const postData = async () => {
        const requestOptions = {
          method: 'POST',
          headers: {
            'x-access-token': localStorage['access-token'],
            'x-auth-token': localStorage['refresh-token'],
            'Content-type': 'application/json',
          },
          body: JSON.stringify(formValues),
        };
        const response = await fetch('/api/breweries/', requestOptions);
        const data = await response.json();
        if (!data.payload) return;
        const post = data.payload;
        navigate(`/breweries/${post._id}`);
      };
      postData();
    };

    validateData()
      .then(() => handleSubmit())
      .catch((error) => console.error(error));
  };

  const handleFormInputChange = (event) => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value });
  };

  return (
    <Box>
      <Container sx={{ marginTop: 4 }}>
        <Grid container sx={{ mt: 5 }}>
          <Grid item md={10} sm={12}>
            <Typography variant='h1'>The Biergarten Index</Typography>
            <Typography variant='h2' gutterBottom sx={{ mb: '1em' }}>
              Breweries
            </Typography>
          </Grid>
          <Grid md={2} sm={12} item>
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate('/breweries')}
              variant='contained'
              sx={{ width: '100%' }}
            >
              Go back
            </Button>
          </Grid>
        </Grid>
        <CreateBreweryForm
          formValues={formValues}
          formErrors={formErrors}
          handleFormInputChange={handleFormInputChange}
          handleSubmit={onFormSubmit}
        />
      </Container>
    </Box>
  );
};
export default CreateBrewery;
