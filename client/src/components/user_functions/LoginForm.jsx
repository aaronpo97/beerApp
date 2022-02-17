import { Avatar, Button, TextField, Paper, Box, Typography } from '@mui/material';

import { Link } from 'react-router-dom';
import { Grid } from '@mui/material';

import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../../util/AuthContext';
import FormErrorAlert from '../utilities/FormErrorAlert';
const LoginForm = () => {
  const [formValues, setFormValues] = useState({ username: '', password: '' });
  const [formErrors, setFormErrors] = useState({});

  const [, dispatch] = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const validateLogin = async () => {
      const loginUser = async () => {
        const requestOptions = {
          body: JSON.stringify({
            username: formValues.username.toLowerCase(),
            password: formValues.password,
          }),
          headers: { 'Content-Type': 'application/json' },
          method: 'POST',
        };
        const response = await fetch('/api/users/login', requestOptions);
        const data = response.status === 200 ? await response.json() : await response.text();

        return response.status === 200 ? data : { message: data };
      };

      const attemptedLogin = await loginUser();

      if (attemptedLogin.message === 'Bad Request' || attemptedLogin.message === 'Unauthorized') {
        const errors = {};

        if (!formValues.username) {
          errors.username = 'Missing username.';
        }
        if (!formValues.password) {
          errors.password = 'Missing password.';
          setFormValues({ ...formValues, password: '' });
        } else {
          errors.credentials = 'Username or password is incorrect.';
          setFormValues({ username: '', password: '' });
        }

        if (Object.keys(errors).length) {
          setFormErrors(errors);
          throw new Error('Login failed.');
        }
      }

      return attemptedLogin;
    };

    const SetUserAndHandleRedirect = async (data) => {
      const getUserInfo = async ({ accessToken, refreshToken }) => {
        const requestOptions = {
          method: 'GET',
          headers: {
            'x-access-token': accessToken,
            'x-auth-token': refreshToken,
          },
        };
        const response = await fetch('/api/users/verifytoken', requestOptions);
        const { payload } = await response.json();
        if (response.status === 200) {
          dispatch({ type: 'UPDATE_CURRENT_USER', payload });
        }
      };
      await getUserInfo(data.payload);

      localStorage['access-token'] = data.payload.accessToken;
      localStorage['refresh-token'] = data.payload.refreshToken;
      navigate(`/beers`);
    };

    validateLogin()
      .then((data) => SetUserAndHandleRedirect(data))
      .catch((error) => console.error(error));
  };

  const handleFormInputChange = (event) => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value });
  };
  return (
    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
      <Box
        sx={{
          my: 8,
          mx: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}></Avatar>
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>

        <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '75%' }}>
          <TextField
            margin='normal'
            required
            fullWidth
            id='username'
            label='Username'
            name='username'
            value={formValues.username}
            sx={{ mb: 0 }}
            autoComplete='username'
            autoFocus
            onChange={handleFormInputChange}
            error={formErrors.credentials || formErrors.username}
          />
          {formErrors.username && <FormErrorAlert error={formErrors.username} />}
          <TextField
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            sx={{ mb: 0 }}
            autoComplete='current-password'
            value={formValues.password}
            onChange={handleFormInputChange}
            error={formErrors.credentials || formErrors.password}
          />
          {formErrors.password && <FormErrorAlert error={formErrors.password} />}

          {formErrors.credentials && <FormErrorAlert error={formErrors.credentials} />}
          <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to={'/forgotpassword'}>Forgot password?</Link>
            </Grid>
            <Grid item>
              <Link to={'/register'}>{"Don't have an account? Sign Up"}</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Grid>
  );
};

export default LoginForm;
