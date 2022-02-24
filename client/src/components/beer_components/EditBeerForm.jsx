import { FormControl, TextField, Grid, Button, Box } from '@mui/material';
import FormErrorAlert from '../utilities/FormErrorAlert';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../../util/AuthContext';

const EditBeerForm = ({ id }) => {
  const [currentUser] = useContext(AuthContext);

  const [formValues, setFormValues] = useState({
    name: '',
    type: '',
    description: '',
    abv: '',
    ibu: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const requestOptions = {
        method: 'GET',
        headers: {
          'x-access-token': localStorage['access-token'],
          'x-auth-token': localStorage['refresh-token'],
        },
      };
      const url = `/api/beers/${id}`;
      const response = await fetch(url, requestOptions);
      if (response.status !== 200) navigate('/notfound');
      const data = await response.json();

      const { name, type, abv, ibu, description } = data.payload;
      setFormValues({ name, type, abv, ibu, description });

      localStorage['access-token'] = response.newAccessToken || localStorage['access-token'];
      if (response.status === 401) {
        localStorage.clear();
      }

      return data;
    };

    const checkAuthStatus = (data) => {
      if (currentUser._id !== data.payload.postedBy._id || !currentUser) {
        navigate(`/beers/${id}`);
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
        const response = await fetch(`/api/beers/${id}`, requestOptions);
        const data = await response.json();
        if (!data.payload) return;
        const post = data.payload;
        navigate(`/beers/${post._id}`);
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

  const handleDelete = () => {
    const sendDeleteRequest = async () => {
      const requestOptions = {
        method: 'DELETE',
        headers: {
          'x-access-token': localStorage['access-token'],
          'x-auth-token': localStorage['refresh-token'],
        },
      };

      const response = await fetch(`/api/beers/${id}`, requestOptions);
      if (response.status === 200) navigate('/beers');
    };
    sendDeleteRequest();
  };
  return (
    <Box component='form' onSubmit={onFormSubmit} noValidate>
      <FormControl fullWidth variant='outlined'>
        <TextField
          required
          value={formValues.name}
          id='name'
          label='Beer name'
          name='name'
          autoComplete='Beer name'
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
          value={formValues.type}
          id='type'
          label='Beer type'
          name='type'
          autoComplete='Beer type'
          autoFocus
          sx={{ mb: 0 }}
          error={formErrors.type}
          onChange={handleFormInputChange}
          margin='normal'
          fullWidth
        />
        {formErrors.type && <FormErrorAlert error={formErrors.type} />}
        <Grid container spacing={3}>
          <Grid item md={6}>
            <TextField
              variant='outlined'
              value={formValues.abv}
              id='outlined-adornment-abv'
              label='ABV (alcohol by volume)'
              name='abv'
              error={formErrors.abv}
              onChange={handleFormInputChange}
              margin='normal'
              fullWidth
              sx={{ mb: 0 }}
            />
          </Grid>
          <Grid item md={6}>
            <TextField
              variant='outlined'
              value={formValues.ibu}
              id='outlined-adornment-abv'
              label='IBU (international bitterness units)'
              name='ibu'
              error={formErrors.ibu}
              onChange={handleFormInputChange}
              margin='normal'
              fullWidth
              sx={{ mb: 0 }}
            />
          </Grid>
        </Grid>
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
    </Box>
  );
};

export default EditBeerForm;
