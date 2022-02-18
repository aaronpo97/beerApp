import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Avatar, Typography, TextField, Button, Grid } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { AuthContext } from '../../util/AuthContext';
import FormErrorAlert from '../utilities/FormErrorAlert';
import ChangePasswordAlert from './ChangePasswordAlert';

const ChangePasswordForm = () => {
  const navigate = useNavigate();
  const [currentUser] = useContext(AuthContext);
  const [formValues, setFormValues] = useState({
    newPassword: '',
    currentPassword: '',
    confirmNewPassword: '',
  });
  const [formErrors, setFormErrors] = useState({});

  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState({ type: null, content: null });

  const validateData = async () => {
    const errors = {};
    const { currentPassword, newPassword, confirmNewPassword } = formValues;
    if (!currentPassword) {
      errors.currentPassword = 'Current password is required.';
    }
    if (!newPassword) {
      errors.newPassword = 'Your new password is required.';
    }
    if (!confirmNewPassword) {
      errors.confirmNewPassword = 'Confirm new password is required.';
    }
    if (newPassword !== confirmNewPassword) {
      errors.confirmNewPassword = 'New password and confirm new password do not match.';
    }
    if (Object.keys(errors).length) {
      setFormErrors(errors);
      throw new Error('Form validation failed.');
    }
  };

  const submitRequest = async () => {
    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage['refresh-token'],
        'x-access-token': localStorage['access-token'],
      },
      body: JSON.stringify(formValues),
    };
    const url = `/api/users/${currentUser._id}/changepassword`;
    return await fetch(url, requestOptions);
  };

  const handleResponse = async (response) => {
    const data = await response.json();
    if (response.status === 401) {
      setShowMessage(true);
      setMessage({
        type: 'error',
        content: 'Cannot change password as your current password is incorrect.',
      });
      return;
    }
    if (data.success) {
      setShowMessage(true);
      setMessage({ type: 'success', content: 'Password changed.' });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    validateData()
      .then(() => submitRequest())
      .then((response) => handleResponse(response))
      .catch((error) => console.error(error));
  };

  const handleFormInputChange = (event) => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value });
  };

  const resetForm = () => {
    setFormValues({ newPassword: '', currentPassword: '', confirmNewPassword: '' });
    setFormErrors({});
    setShowMessage(false);
    setMessage({ type: null, content: null });
  };

  return (
    <Box sx={{ my: 8, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}></Avatar>
      <Typography variant='h3' component='h1'>
        Change Password
      </Typography>

      {showMessage ? (
        <ChangePasswordAlert message={message} resetForm={resetForm} />
      ) : (
        <Box sx={{ width: '90%' }} component='form' noValidate onSubmit={handleSubmit}>
          <TextField
            margin='normal'
            fullWidth
            required
            id='currentPassword'
            label='Current password'
            name='currentPassword'
            type='password'
            value={formValues.currentPassword}
            sx={{ mb: 0 }}
            autoComplete='currentPassword'
            autoFocus
            onChange={handleFormInputChange}
            error={!!formErrors.currentPassword}
          />
          {formErrors.currentPassword && <FormErrorAlert error={formErrors.currentPassword} />}
          <TextField
            margin='normal'
            fullWidth
            required
            id='newPassword'
            label='New password'
            name='newPassword'
            type='password'
            value={formValues.newPassword}
            sx={{ mb: 0 }}
            autoComplete='newPassword'
            autoFocus
            onChange={handleFormInputChange}
            error={!!formErrors.newPassword}
          />
          {formErrors.newPassword && <FormErrorAlert error={formErrors.newPassword} />}
          <TextField
            margin='normal'
            fullWidth
            required
            id='confirmNewPassword'
            label='Confirm new password'
            type='password'
            name='confirmNewPassword'
            value={formValues.confirmNewPassword}
            sx={{ mb: 0 }}
            autoComplete='confirmNewPassword'
            autoFocus
            onChange={handleFormInputChange}
            error={!!formErrors.confirmNewPassword}
          />
          {formErrors.confirmNewPassword && <FormErrorAlert error={formErrors.confirmNewPassword} />}
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item md={6}>
              <Button
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate('/account-settings')}
                variant='contained'
                fullWidth
              >
                Discard edits
              </Button>
            </Grid>
            <Grid item md={6}>
              <Button variant='contained' type='submit' fullWidth>
                Change password
              </Button>
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default ChangePasswordForm;
