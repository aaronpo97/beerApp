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

const UsernameForm = () => {
  const [currentUser, dispatch] = useContext(AuthContext);

  useEffect(() => {
    setEditFormValues({ username: currentUser.username });
  }, [currentUser]);

  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({});
  const [editFormValues, setEditFormValues] = useState({});

  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');

  const validateData = async () => {
    const checkUserInDB = async (username) => {
      try {
        const response = await fetch(`/api/users/checkifuserexists?username=${username}`);
        const data = await response.json();
        return data.payload;
      } catch (error) {
        return { message: 'username was blank.' };
      }
    };

    const userCheck = await checkUserInDB(editFormValues.username);

    const errors = {};
    if (!editFormValues.username) {
      errors.username = 'Username is required.';
    }
    if (editFormValues.username.toLowerCase() === currentUser.username.toLowerCase()) {
      setShowMessage(true);
      setMessage('Username remained the same.');
      throw new Error('Form validation failed.');
    }
    if (userCheck.usernameExists) {
      errors.username = 'That username is already taken.';
    }
    if (Object.keys(errors).length) {
      setFormErrors(errors);
      throw new Error('Form validation failed.');
    }
  };

  const submitData = async () => {
    const url = `/api/users/${currentUser._id}/updateusername`;
    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage['access-token'],
        'x-auth-token': localStorage['refresh-token'],
      },
      body: JSON.stringify({ username: editFormValues.username.toLowerCase() }),
    };
    const response = await fetch(url, requestOptions);
    return await response.json();
  };

  const handleUpdate = ({ username }) => {
    dispatch({ type: 'UPDATE_USERNAME', payload: { username } });
    setShowMessage(true);
    setMessage('Username updated.');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    validateData()
      .then(() => submitData())
      .then((data) => handleUpdate(data.payload))
      .catch((error) => console.error(error));
  };
  const handleFormInputChange = (event) => {
    setEditFormValues({ username: event.target.value });
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
          Edit Username
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
                id='username'
                name='username'
                autoComplete='username'
                autoFocus
                value={editFormValues.username || ''}
                onChange={handleFormInputChange}
                label='Username'
              />
              {formErrors.username && <FormErrorAlert error={formErrors.username} />}

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
                    Edit username
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
export default UsernameForm;
