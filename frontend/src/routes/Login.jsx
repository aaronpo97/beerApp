import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Grid } from '@mui/material';

import LoginForm from '../components/user_functions/LoginForm';
import SideImage from '../components/utilities/SideImage';

const Login = ({ setCurrentUser }) => {
   const [formValues, setFormValues] = useState({ username: '', password: '' });
   const [formErrors, setFormErrors] = useState({});

   const navigate = useNavigate();

   const handleSubmit = event => {
      event.preventDefault();

      const validateLogin = async () => {
         const loginUser = async () => {
            const requestOptions = {
               body: JSON.stringify({
                  username: formValues.username,
                  password: formValues.password,
               }),
               headers: { 'Content-Type': 'application/json' },
               method: 'POST',
            };
            const response = await fetch('http://localhost:5000/api/users/login', requestOptions);
            const data = response.status === 200 ? await response.json() : await response.text();

            if (response.status === 200) {
               setCurrentUser(data.payload.userId);
            }
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
            setFormErrors(errors);
            throw new Error('Login failed.');
         }

         return attemptedLogin;
      };

      const handleRedirect = async data => {
         localStorage['access-token'] = data.payload.accessToken;
         localStorage['refresh-token'] = data.payload.refreshToken;

         navigate(`/beers`);
      };

      validateLogin()
         .then(data => handleRedirect(data))
         .catch(error => console.error(error));
   };

   const handleFormInputChange = event => {
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
