import { useEffect, useContext, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  FormControl,
  Button,
  TextField,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import { AuthContext } from '../../util/AuthContext';

const PasswordResetPage = () => {
  const currentUser = useContext(AuthContext);

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

  useEffect(() => {
    console.log(currentUser);
  }, [currentUser]);

  const handleFormInputChange = (event) => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value });
  };
  return (
    <Box>
      <Container sx={{ mt: 5 }}>
        <Typography variant='h1'>Forgot your password?</Typography>
        <Grid container spacing={1} sx={{ mt: 2 }}>
          <Grid md={6} item>
            <Card>
              <CardContent>
                <Typography variant='body2'>
                  Tell us the username and email address associated with your Biergarten account, and we will
                  send you an email with a link to reset your password.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid md={6} item>
            <Box component='form' onSubmit={handleSubmit}>
              <FormControl fullWidth>
                <TextField
                  margin='normal'
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
                <Button variant='contained' type='submit' sx={{ mt: 2 }}>
                  Request password reset
                </Button>
              </FormControl>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default PasswordResetPage;
