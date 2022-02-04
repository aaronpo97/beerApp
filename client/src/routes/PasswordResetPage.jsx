import { useEffect, useContext, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  FormControl,
  Button,
  TextField,
  Card,
  CardContent,
} from '@mui/material';
import { AuthContext } from '../util/AuthContext';

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
      const url = `api/users/${currentUser._id}/requestpasswordreset`;
      const requestOptions = {};
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
        <Typography variant='h1' gutterBottom>
          Forgot your password?
        </Typography>
        <Box component='form' onSubmit={handleSubmit}>
          <Card>
            <CardContent>
              <Typography variant='body2'>
                Tell us the username and email address associated with your Biergarten account,
                and we will send you an email with a link to reset your password.
              </Typography>
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
              </FormControl>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </Box>
  );
};

export default PasswordResetPage;
