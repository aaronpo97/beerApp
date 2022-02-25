import { useParams, useNavigate } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../util/AuthContext';

import { Button, FormControl, Grid, TextField } from '@mui/material';

import FormErrorAlert from '../utilities/FormErrorAlert';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const EditBreweryForm = ({ id }) => {
  const navigate = useNavigate();

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

    if (Object.keys(errors).length) {
      setFormErrors(errors);
      throw new Error('Form validation failed.');
    }
  };

  const submitData = async () => {
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

  const onFormSubmit = (event) => {
    event.preventDefault();
    validateData()
      .then(() => submitData())
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
    <FormControl fullWidth component='form' onSubmit={onFormSubmit} variant='outlined' noValidate>
      <TextField
        required
        value={formValues.name}
        id='name'
        label='Brewery name'
        name='name'
        autoComplete='Brewery name'
        autoFocus
        sx={{ mb: 0 }}
        error={formErrors.name}
        onChange={handleFormInputChange}
        margin='normal'
        fullWidth
      />
      {formErrors.name && <FormErrorAlert error={formErrors.name} />}

      <TextField
        required
        variant='outlined'
        value={formValues.description}
        id='outlined-adornment-abv'
        label='Description'
        name='description'
        error={formErrors.description}
        onChange={handleFormInputChange}
        sx={{ mb: 0 }}
        margin='normal'
        multiline
        rows={10}
        fullWidth
      />
      {formErrors.description && <FormErrorAlert error={formErrors.description} />}

      <Grid container spacing={2}>
        <Grid item md={6}>
          <Button
            startIcon={<DeleteForeverIcon />}
            fullWidth
            sx={{ mt: 3, mb: 2 }}
            variant='contained'
            color='error'
            onClick={handleDelete}
          >
            Delete &quot;{formValues.name}&quot;
          </Button>
        </Grid>
        <Grid item md={6}>
          <Button type='submit' fullWidth sx={{ mt: 3, mb: 2 }} variant='contained'>
            Post Edits
          </Button>
        </Grid>
      </Grid>
    </FormControl>
  );
};

export default EditBreweryForm;
