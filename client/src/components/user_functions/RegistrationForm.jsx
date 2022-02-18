import { Link } from 'react-router-dom';
import { Grid, Avatar, Button, TextField, Box, Typography, Alert } from '@mui/material';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import ms from 'ms';

import { AuthContext } from '../../util/AuthContext';

const RegistrationForm = () => {
  const initialRegistrationData = {
    username: '',
    dateOfBirth: null,
    password: '',
    confirmPassword: '',
    email: '',
    firstName: '',
    lastName: '',
  };

  const blocklistedWords = ['1^Ce9T]Re-J|']; //test phrase

  const navigate = useNavigate();

  const [, dispatch] = useContext(AuthContext);
  const [formValues, setFormValues] = useState(initialRegistrationData);
  const [formErrors, setFormErrors] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();

    const validateData = async () => {
      const { firstName, lastName, password, username, email, dateOfBirth, confirmPassword } = formValues;
      const errors = {};
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

      const checkUserInDB = async (usernameQuery, emailQuery) => {
        try {
          const response = await fetch(
            `/api/users/checkifuserexists?username=${usernameQuery}&email=${emailQuery}`,
          );
          const data = await response.json();
          return data.payload;
        } catch (error) {
          return { message: 'username and/or email was blank.' };
        }
      };

      const checkDateOfBirth = () => {
        if (!dateOfBirth) return false;
        const minimumDOB = Date.now() - ms('19 years');

        return dateOfBirth <= minimumDOB;
      };
      const userQueryResponse = await checkUserInDB(username, email);

      if (!username) {
        errors.username = 'Username is required.';
      } else if (blocklistedWords.includes(username)) {
        errors.username = 'That username is not allowed.';
      } else if (userQueryResponse.usernameExists) {
        errors.username = 'That username is taken.';
      }

      if (!dateOfBirth) {
        errors.dateOfBirth = 'Date of birth is required.';
      } else if (!checkDateOfBirth()) {
        errors.dateOfBirth = `You are not old enough to use this application.`;
      }

      if (!password) {
        errors.password = 'Password is required.';
      }
      if (!confirmPassword) {
        errors.confirmPassword = 'Please confirm your password.';
      } else if (password !== confirmPassword) {
        errors.confirmPassword = 'Password and confirm password do not match.';
      }

      if (!email) {
        errors.email = 'Email is required.';
      } else if (!emailRegex.test(email)) {
        errors.email = 'That email is invalid.';
      } else if (userQueryResponse.emailExists) {
        errors.email = 'That email is already associated with an account.';
      }

      if (!firstName) {
        errors.firstName = 'First name is required.';
      }
      if (!lastName) {
        errors.lastName = 'Last name is required.';
      }

      if (Object.keys(errors).length) {
        setFormErrors(errors);
        throw new Error('Form validation failed.');
      }
    };

    const registerUser = async () => {
      const url = '/api/users/register';
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formValues, username: formValues.username.toLowerCase() }),
      };

      const response = await fetch(url, requestOptions);
      if (response.status !== 201) throw new Error('Account not registered!');
      const data = await response.json();

      dispatch({ type: 'UPDATE_CURRENT_USER', payload: data.payload.newUser });

      return data;
    };

    const handleLoginAndRedirect = (data) => {
      //login user with new credentials
      localStorage['access-token'] = data.payload.accessToken;
      localStorage['refresh-token'] = data.payload.refreshToken;

      //take user to profile page, where they are prompted to check email for confirmation link
      navigate(`/profile/${data.payload.newUser._id}`);
    };

    //function calls
    validateData()
      .then(() => registerUser())
      .then((data) => handleLoginAndRedirect(data))
      .catch((err) => console.log(err));
  };

  const handleFormInputChange = (event) => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value });
  };

  const handleDatePickerChange = (value) => {
    setFormValues({ ...formValues, dateOfBirth: value });
  };

  const { firstName, lastName, password, username, email, dateOfBirth, confirmPassword } = formValues;

  return (
    <Box sx={{ width: '100%' }} square>
      <Box sx={{ my: 8, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}></Avatar>
        <Typography component='h1' variant='h3'>
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
