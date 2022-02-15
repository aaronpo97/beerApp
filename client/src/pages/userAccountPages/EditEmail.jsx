import { useState, useEffect, useContext } from 'react';

import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../util/AuthContext';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  Box,
  Container,
  FormControl,
  TextField,
  Button,
  Avatar,
  Typography,
  Alert,
  Grid,
} from '@mui/material';

import FormErrorAlert from '../../components/utilities/FormErrorAlert';

const EditEmail = () => {
  const [currentUser, dispatch] = useContext(AuthContext);

  useEffect(() => {
    setEditFormValues({ email: currentUser.email });
  }, [currentUser]);

  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({});
  const [editFormValues, setEditFormValues] = useState({});

  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');

  const validateData = async () => {
    const checkUserInDB = async (email) => {
      try {
        const response = await fetch(`/api/users/checkifuserexists?email=${email}`);
        const data = await response.json();
        return data.payload;
      } catch (error) {
        return { message: 'email was blank.' };
      }
    };

    const userCheck = await checkUserInDB(editFormValues.email);

    const errors = {};
    if (!editFormValues.email) {
      errors.email = 'Email is required.';
    }
    if (editFormValues.email.toLowerCase() === currentUser.email.toLowerCase()) {
      setShowMessage(true);
      setMessage('Email remained the same.');
      throw new Error('Form validation failed.');
    }
    if (userCheck.emailExists) {
      errors.email = 'That email is already taken.';
    }
    if (Object.keys(errors).length) {
      setFormErrors(errors);
      throw new Error('Form validation failed.');
    }
  };

  const submitData = async () => {
    const url = `/api/users/${currentUser._id}/updateemail`;
    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage['access-token'],
        'x-auth-token': localStorage['refresh-token'],
      },
      body: JSON.stringify({ email: editFormValues.email.toLowerCase() }),
    };
    const response = await fetch(url, requestOptions);
    return await response.json();
  };

  const handleUpdate = (email) => {
    dispatch({ type: 'UPDATE_EMAIL', payload: { email } });
    setShowMessage(true);
    setMessage('Email updated.');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    validateData()
      .then(() => submitData())
      .then((data) => handleUpdate(data.payload))
      .catch((error) => console.error(error));
  };
  const handleFormInputChange = (event) => {
    setEditFormValues({ email: event.target.value });
  };

  return (
    <Container>
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
          Edit Email
        </Typography>

        {showMessage ? (
          <Alert
            action={
              <Button color='inherit' size='small' onClick={() => navigate('/account-settings')}>
                Go back to Account Settings
              </Button>
            }
            sx={{ height: '200px', mt: 3, width: '100%' }}
          >
            {message}
          </Alert>
        ) : (
          <Box sx={{ width: '100%' }} noValidate component='form' onSubmit={handleSubmit}>
            <FormControl fullWidth>
              <TextField
                margin='normal'
                required
                fullWidth
                id='email'
                name='email'
                autoComplete='email'
                autoFocus
                value={editFormValues.email || ''}
                onChange={handleFormInputChange}
                label='Email'
              />
              {formErrors.email && <FormErrorAlert error={formErrors.email} />}

              <Grid container spacing={3}>
                <Grid item md={6}>
                  <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate('/account-settings')}
                    variant='contained'
                    sx={{ mt: 1 }}
                    fullWidth
                  >
                    Discard edits
                  </Button>
                </Grid>
                <Grid item md={6}>
                  <Button fullWidth sx={{ mt: 1 }} variant='contained' type='submit'>
                    Edit Email
                  </Button>
                </Grid>
              </Grid>
            </FormControl>
          </Box>
        )}
      </Box>
    </Container>
  );
};
export default EditEmail;
