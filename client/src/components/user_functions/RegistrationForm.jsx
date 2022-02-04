import { Link } from 'react-router-dom';
import { Grid, Avatar, Button, TextField, Box, Typography, Alert } from '@mui/material';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

const RegistrationForm = ({
  formValues,
  formErrors,
  handleFormInputChange,
  handleDatePickerChange,
  handleSubmit,
}) => {
  const { firstName, lastName, password, username, email, dateOfBirth, confirmPassword } =
    formValues;

  return (
    <Box sx={{ width: '100%' }} square>
      <Box
        sx={{ my: 8, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
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
          <Grid container spacing={{ xs: 0, md: 2 }}>
            <Grid item md={6} xs={12}>
              <Box>
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
                  sx={{ mb: 0 }}
                />

                {formErrors.firstName && (
                  <Alert
                    severity='error'
                    sx={{
                      mt: '10px',
                      mb: '0em',
                      padding: '0px',
                      paddingLeft: '10px',
                      paddingRight: '10px',
                      fontSize: '0.77rem',
                      height: '32px',
                    }}
                  >
                    {formErrors.firstName}
                  </Alert>
                )}
              </Box>
            </Grid>
            <Grid item md={6} xs={12}>
              <Box>
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
                  sx={{ mb: 0 }}
                />
                {formErrors.lastName && (
                  <Alert
                    severity='error'
                    sx={{
                      mt: '10px',
                      mb: '0em',
                      padding: '0px',
                      paddingLeft: '10px',
                      paddingRight: '10px',
                      fontSize: '0.77rem',
                      height: '32px',
                    }}
                  >
                    {formErrors.lastName}
                  </Alert>
                )}
              </Box>
            </Grid>
          </Grid>

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
              sx={{ mb: 0 }}
            />
            {formErrors.username && (
              <Alert
                severity='error'
                sx={{
                  mt: '10px',
                  mb: '0em',
                  padding: '0px',
                  paddingLeft: '10px',
                  paddingRight: '10px',
                  fontSize: '0.77rem',
                  height: '32px',
                }}
              >
                {formErrors.username}
              </Alert>
            )}
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
              sx={{ mb: formErrors.email ? 0 : '1em' }}
            />
            {formErrors.email && (
              <Alert
                severity='error'
                sx={{
                  mt: '10px',
                  mb: '1em',
                  padding: '0px',
                  paddingLeft: '10px',
                  paddingRight: '10px',
                  fontSize: '0.77rem',
                  height: '32px',
                }}
              >
                {formErrors.email}
              </Alert>
            )}
          </Box>
          <>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label='Date of Birth'
                name='dateOfBirth'
                value={dateOfBirth}
                onChange={handleDatePickerChange}
                error={formErrors.dateOfBirth ? true : false}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            {formErrors.dateOfBirth && (
              <Alert
                severity='error'
                sx={{
                  mt: '10px',
                  mb: '0em',
                  padding: '0px',
                  paddingLeft: '10px',
                  paddingRight: '10px',
                  fontSize: '0.77rem',
                  height: '32px',
                }}
              >
                {formErrors.dateOfBirth}
              </Alert>
            )}
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
              onChange={handleFormInputChange}
              error={formErrors.password ? true : false}
              sx={{ mb: 0 }}
            />
            {formErrors.password && (
              <Alert
                severity='error'
                sx={{
                  mt: '10px',
                  mb: '0em',
                  padding: '0px',
                  paddingLeft: '10px',
                  paddingRight: '10px',
                  fontSize: '0.77rem',
                  height: '32px',
                }}
              >
                {formErrors.password}
              </Alert>
            )}
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
              error={formErrors.confirmPassword ? true : false}
            />
            {formErrors.confirmPassword && (
              <Alert
                severity='error'
                sx={{
                  mt: '0px',
                  mb: '0em',
                  padding: '0px',
                  paddingLeft: '10px',
                  paddingRight: '10px',
                  fontSize: '0.77rem',
                  height: '32px',
                }}
              >
                {formErrors.confirmPassword}
              </Alert>
            )}
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
