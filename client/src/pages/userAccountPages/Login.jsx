import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../../util/AuthContext';
import { Grid } from '@mui/material';

import LoginForm from '../../components/user_functions/LoginForm';
import SideImage from '../../components/utilities/SideImage';

const Login = () => {
  const [formValues, setFormValues] = useState({ username: '', password: '' });
  const [formErrors, setFormErrors] = useState({});

  const [currentUser, dispatch] = useContext(AuthContext);
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
    <Grid container component='main' sx={{ height: '100vh' }}>
      <SideImage
        imageUrl={
          'https://images.pexels.com/photos/5858056/pexels-photo-5858056.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
        }
      />
      <LoginForm
        formValues={formValues}
        formErrors={formErrors}
        handleSubmit={handleSubmit}
        handleFormInputChange={handleFormInputChange}
      />
    </Grid>
  );
};

export default Login;
