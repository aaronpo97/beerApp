import { useState } from 'react';
import { Avatar, Box, Button, TextField, Typography } from '@mui/material';

const PasswordResetForm = () => {
  const [formValues, setFormValues] = useState({});
  const [formErrors, setFormErrors] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();

    const validateData = async () => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
      const errors = {};
      if (!formValues.username) {
        errors.username = 'Username is required.';
      }
      if (!formValues.email) {
        errors.email = 'Email is required.';
      } else if (!emailRegex.test(formValues.email)) {
        errors.email = 'Invalid email.';
      }
      if (Object.keys(errors).length) {
        setFormErrors(errors);
        throw new Error('Login failed.');
      }
    };

    const submitRequest = async () => {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': localStorage['refresh-token'],
          'x-access-token': localStorage['access-token'],
        },
        body: JSON.stringify(formValues),
      };

      const url = '/api/users/help/requestpasswordreset';
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      return data;
    };

    validateData()
      .then(() => submitRequest())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  };

  const handleFormInputChange = (event) => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value });
  };

  return (
    <Box sx={{ my: 8, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}></Avatar>
      <Typography variant='h3' component='h1'>
        Forgot your password?
      </Typography>
      <Box component='div' sx={{ mt: 2, mb: 1 }}>
        <Typography variant='body2'>
          Tell us the username and email address associated with your Biergarten account, and we will send you
          an email with a link to reset your password.
        </Typography>
      </Box>
      <Box sx={{ width: '90%' }} component='form' onSubmit={handleSubmit}>
        <TextField
          margin='normal'
          fullWidth
          required
          id='username'
          label='Username'
          name='username'
          value={formValues.username}
          sx={{ mb: 0 }}
          autoComplete='username'
          autoFocus
          onChange={handleFormInputChange}
          error={formErrors.username}
        >
          Email
        </TextField>
        <TextField
          margin='normal'
          fullWidth
          required
          id='email'
          label='email'
          name='email'
          value={formValues.email}
          sx={{ mb: 0 }}
          autoComplete='email'
          autoFocus
          onChange={handleFormInputChange}
          error={formErrors.email}
        >
          Username
        </TextField>
        <Button variant='contained' type='submit' fullWidth sx={{ mt: 2 }}>
          Request password reset
        </Button>
      </Box>
    </Box>
  );
};

export default PasswordResetForm;
