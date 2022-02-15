import { useState, useEffect } from 'react';
import { Container, Box, Typography, Button, Grid } from '@mui/material';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

import CreateBeerForm from '../../components/beer_components/CreateBeerForm';

const CreateBeer = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    name: '',
    type: '',
    description: '',
    abv: '',
    ibu: '',
    brewery: '',
  });
  const [formErrors, setFormErrors] = useState({});

  //get brewery list
  const [breweryList, setBreweryList] = useState([]);

  const onFormSubmit = (event) => {
    event.preventDefault();
    const validateData = async () => {
      const errors = {};

      if (!formValues.name) {
        errors.name = 'Beer name is required.';
      }
      if (!formValues.type) {
        errors.type = 'Beer type is required.';
      }

      if (formValues.abv && !parseFloat(formValues.abv)) {
        errors.abv = 'ABV must be a number.';
      }
      if (formValues.ibu && !parseFloat(formValues.ibu)) {
        errors.ibu = 'IBU must be a number.';
      }

      if (!formValues.description) {
        errors.description = 'Description is required.';
      }
      if (!breweryList.map((brewery) => brewery._id).includes(formValues.brewery)) {
        errors.brewery = 'Invalid brewery.';
      }

      if (Object.keys(errors).length) {
        setFormErrors(errors);
        throw new Error('Form validation failed.');
      }
    };

    const handleSubmit = async () => {
      const requestOptions = {
        method: 'POST',
        headers: {
          'x-access-token': localStorage['access-token'],
          'x-auth-token': localStorage['refresh-token'],
          'Content-type': 'application/json',
        },
        body: JSON.stringify(formValues),
      };
      const response = await fetch('/api/beers/', requestOptions);
      const data = await response.json();
      if (!data.payload) return;
      const post = data.payload;
      navigate(`/beers/${post._id}`);
    };

    validateData()
      .then(() => handleSubmit())
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    const fetchData = async () => {
      const requestOptions = {
        method: 'GET',
        headers: {
          'x-access-token': localStorage['access-token'],
          'x-auth-token': localStorage['refresh-token'],
        },
      };
      const url = `http://localhost:5000/api/breweries`;
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      setBreweryList(data.payload || []);
      localStorage['access-token'] = response.newAccessToken || localStorage['access-token'];
      if (response.status === 401) {
        localStorage.clear();
      }
    };
    fetchData();
  }, []);

  const handleFormInputChange = (event) => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value });
  };

  return (
    <Box>
      <Container sx={{ marginTop: 7 }}>
        <Grid container sx={{ mt: 5 }}>
          <Grid item md={10} sm={12}>
            <Typography variant='h1'>The Biergarten Index</Typography>
            <Typography variant='h2' gutterBottom sx={{ mb: '1em' }}>
              Beers
            </Typography>
          </Grid>
          <Grid md={2} sm={12} item>
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate('/beers')}
              variant='contained'
              sx={{ width: '100%' }}
            >
              Go back
            </Button>
          </Grid>
        </Grid>
        <CreateBeerForm
          formValues={formValues}
          formErrors={formErrors}
          handleFormInputChange={handleFormInputChange}
          handleSubmit={onFormSubmit}
          breweryList={breweryList}
        />
      </Container>
    </Box>
  );
};
export default CreateBeer;
