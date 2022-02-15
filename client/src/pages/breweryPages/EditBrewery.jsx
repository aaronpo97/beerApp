import { useState, useEffect, useContext } from 'react';

import { Container, Box, Typography, Button, Grid } from '@mui/material';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useParams } from 'react-router-dom';

import EditBreweryForm from '../../components/brewery_components/EditBreweryForm';
import { AuthContext } from '../../util/AuthContext';

const EditBrewery = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formValues, setFormValues] = useState({
    name: '',
    description: '',
    address: '',
  });

  const [currentUser] = useContext(AuthContext);

  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const requestOptions = {
        method: 'GET',
        headers: {
          'x-access-token': localStorage['access-token'],
          'x-auth-token': localStorage['refresh-token'],
        },
      };
      const url = `/api/breweries/${id}`;
      const response = await fetch(url, requestOptions);
      if (response.status !== 200) navigate('/notfound');
      const data = await response.json();

      console.log(data.payload);
      const { name, description } = data.payload;
      setFormValues({ name, description });

      localStorage['access-token'] = response.newAccessToken || localStorage['access-token'];
      if (response.status === 401) {
        localStorage.clear();
      }

      return data;
    };

    const checkAuthStatus = (data) => {
      if (currentUser._id !== data.payload.postedBy._id || !currentUser) {
        navigate(`/breweries/${id}`);
        return;
      }
      return;
    };
    fetchData().then((data) => checkAuthStatus(data));
  }, [currentUser, id, navigate]);

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

      console.log(errors);
      if (Object.keys(errors).length) {
        setFormErrors(errors);
        throw new Error('Form validation failed.');
      }
    };

    const handleSubmit = () => {
      const postData = async () => {
        const requestOptions = {
          method: 'PUT',
          headers: {
            'x-access-token': localStorage['access-token'],
            'x-auth-token': localStorage['refresh-token'],
            'Content-type': 'application/json',
          },
          body: JSON.stringify(formValues),
        };
        const response = await fetch(`/api/breweries/${id}`, requestOptions);
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

  const handleDelete = () => {
    const sendDeleteRequest = async () => {
      const requestOptions = {
        method: 'DELETE',
        headers: {
          'x-access-token': localStorage['access-token'],
          'x-auth-token': localStorage['refresh-token'],
        },
      };

      const response = await fetch(`/api/breweries/${id}`, requestOptions);
      if (response.status === 200) navigate('/beers');
    };
    sendDeleteRequest();
  };

  const handleFormInputChange = (event) => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value });
  };

  return (
    <Box>
      <Container sx={{ marginTop: 5 }}>
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
        <EditBreweryForm
          formValues={formValues}
          formErrors={formErrors}
          handleFormInputChange={handleFormInputChange}
          handleSubmit={onFormSubmit}
          handleDelete={handleDelete}
        />
      </Container>
    </Box>
  );
};
export default EditBrewery;
