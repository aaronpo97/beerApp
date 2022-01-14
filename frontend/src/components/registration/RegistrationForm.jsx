import { Link } from 'react-router-dom';

import { Grid, Avatar, Button, TextField, Paper, Box, Typography } from '@mui/material';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

const RegistrationForm = ({ registrationFormValues, setRegistrationFormValues, handleSubmit, formErrors }) => {
  const handleFormInputChange = event => {
    setRegistrationFormValues({ ...registrationFormValues, [event.target.name]: event.target.value });
  };

  const handleDatePickerChange = value => {
    setRegistrationFormValues({ ...registrationFormValues, dateOfBirth: value });
  };

  const { firstName, lastName, password, username, email, dateOfBirth, confirmPassword } = registrationFormValues;

  return (
    <Box sx={{ width: '100%' }} square>
      <Box sx={{ my: 8, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}></Avatar>
        <Typography component='h1' variant='h5'>
          Create an Account
        </Typography>

        <Box
          component='form'
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 1, display: 'flex', flexDirection: 'column', width: '90%' }}
        >
          <Box>
            <Grid container spacing={2}>
              <Grid item md={6}>
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  id='first-name'
                  label='First Name'
                  name='firstName'
                  value={firstName}
                  autoComplete='firstName'
                  autoFocus
                  error={formErrors.firstName ? true : false}
                  onChange={handleFormInputChange}
                />
                <Typography variant='body2'>{formErrors.firstName}</Typography>
              </Grid>
              <Grid item md={6}>
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  id='last-name'
                  label='Last Name'
                  name='lastName'
                  value={lastName}
                  autoComplete='lastName'
                  autoFocus
                  error={formErrors.lastName ? true : false}
                  onChange={handleFormInputChange}
                />
                <Typography variant='body2'>{formErrors.lastName}</Typography>
              </Grid>
            </Grid>
          </Box>

          <Box>
            <TextField
              margin='normal'
              required
              fullWidth
              id='username'
              label='Username'
              name='username'
              value={username}
              autoComplete='username'
              autoFocus
              error={formErrors.username ? true : false}
              onChange={handleFormInputChange}
            />
            <Typography variant='body2'>{formErrors.username}</Typography>
          </Box>

          <Box>
            <TextField
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email'
              name='email'
              value={email}
              type='email'
              autoComplete='email'
              autoFocus
              onChange={handleFormInputChange}
              error={formErrors.email ? true : false}
            />
            <Typography variant='body2'>{formErrors.email}</Typography>
          </Box>
          <>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label='Date of Birth'
                name='dateOfBirth'
                value={dateOfBirth}
                onChange={handleDatePickerChange}
                error={formErrors.dateOfBirth ? true : false}
                renderInput={params => <TextField {...params} />}
                sx={{ width: '100%' }}
              />
            </LocalizationProvider>
            <Typography variant='body2'>{formErrors.dateOfBirth}</Typography>
          </>

          <Box>
            <TextField
              margin='normal'
              required
              fullWidth
              id='password'
              label='Password'
              name='password'
              value={password}
              type='password'
              autoComplete='password'
              autoFocus
              sx={{ mt: '1.5em' }}
              onChange={handleFormInputChange}
              error={formErrors.password ? true : false}
            />
            <Typography variant='body2'>{formErrors.password}</Typography>
            <TextField
              margin='normal'
              required
              type='password'
              fullWidth
              id='confirm-password'
              label='Confirm Password'
              name='confirmPassword'
              value={confirmPassword}
              autoComplete='password'
              autoFocus
              onChange={handleFormInputChange}
              error={formErrors.password ? true : false}
            />
          </Box>

          <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
            Register Account
          </Button>

          <Grid container>
            <Grid item>
              <Link to={'/login'}>{'Already have an account?'}</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default RegistrationForm;
