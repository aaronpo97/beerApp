import { useContext, useEffect, useState } from 'react';

import { AuthContext } from '../util/AuthContext';

import { Container, Typography, FormControl, TextField, Box, Grid, Button } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

import { useNavigate } from 'react-router-dom';

const AccountInfoView = () => {
  const [currentUser] = useContext(AuthContext);

  const [formValues, setFormValues] = useState({});

  useEffect(() => {
    setFormValues(currentUser);
  }, [currentUser]);
  return (
    <FormControl component='div' fullWidth sx={{ mt: 2 }}>
      <Grid container spacing={2}>
        <Grid item md={6}>
          <TextField
            InputProps={{ readOnly: true }}
            margin='normal'
            required
            fullWidth
            id='first-name'
            label='First name'
            name='firstName'
            value={formValues.firstName ?? ''}
            type='email'
            autoComplete='email'
            autoFocus
            readOnly
          />
        </Grid>
        <Grid item md={6}>
          <TextField
            InputProps={{ readOnly: true }}
            margin='normal'
            required
            fullWidth
            id='last-name'
            label='Last name'
            name='lastName'
            value={formValues.lastName ?? ''}
            type='name'
            autoComplete='name'
            autoFocus
            readOnly
          />
        </Grid>
      </Grid>
      <TextField
        InputProps={{ readOnly: true }}
        margin='normal'
        required
        fullWidth
        id='email'
        label='Email'
        name='email'
        value={formValues.email ?? ''}
        type='email'
        autoComplete='email'
        autoFocus
        readOnly
      />
      <TextField
        InputProps={{ readOnly: true }}
        margin='normal'
        required
        fullWidth
        id='username'
        label='Username'
        name='username'
        value={formValues.username ?? ''}
        type='username'
        autoComplete='username'
        autoFocus
        readOnly
      />
      <>
        <Box sx={{ mt: 3 }} />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label='Date of birth'
            readOnly
            fullWidth
            onChange={() => {}}
            value={formValues.dateOfBirth ?? null}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <Box sx={{ mt: 3 }} />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label='Member since'
            readOnly
            fullWidth
            value={formValues.createdAt ?? null}
            onChange={() => {}}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </>
      <Box sx={{ mt: 3 }} />
    </FormControl>
  );
};
const EditAccountInfo = () => {
  const [currentUser] = useContext(AuthContext);

  const [formValues, setFormValues] = useState({});
  const [formErrors, setFormErrors] = useState({});

  const handleFormInputChange = (event) => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    setFormValues(currentUser);
  }, [currentUser]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const validateData = async () => {
      const errors = {};

      if (!formValues.firstName) {
        errors.firstName = 'First name is required.';
      }
      if (!formValues.lastName) {
        errors.lastName = 'Last name is required.';
      }
      if (!formValues.email) {
        errors.email = 'Email is required.';
      }
      if (!formValues.username) {
        errors.username = 'Username is required.';
      }
    };
    validateData();
  };
  return (
    <FormControl component='form' onSubmit={handleSubmit} fullWidth sx={{ mt: 2 }}>
      <Grid container spacing={2}>
        <Grid item md={6}>
          <TextField
            noValidate
            margin='normal'
            required
            fullWidth
            id='first-name'
            label='First name'
            name='firstName'
            value={formValues.firstName ?? ''}
            error={!!formErrors.firstName}
            autoFocus
            onChange={handleFormInputChange}
          />
        </Grid>
        <Grid item md={6}>
          <TextField
            noValidate
            margin='normal'
            required
            fullWidth
            id='last-name'
            label='Last name'
            name='lastName'
            value={formValues.lastName ?? ''}
            type='name'
            autoComplete='name'
            autoFocus
            error={!!formErrors.lastName}
            onChange={handleFormInputChange}
          />
        </Grid>
      </Grid>
      <TextField
        noValidate
        margin='normal'
        required
        fullWidth
        id='email'
        label='Email'
        name='email'
        value={formValues.email ?? ''}
        error={!!formErrors.email}
        type='email'
        autoComplete='email'
        autoFocus
        onChange={handleFormInputChange}
      />
      <TextField
        noValidate
        margin='normal'
        required
        fullWidth
        id='username'
        label='Username'
        name='username'
        error={!!formErrors.username}
        value={formValues.username ?? ''}
        type='username'
        autoComplete='username'
        autoFocus
        onChange={handleFormInputChange}
      />
      <Button type='submit' variant='contained' sx={{ mt: 2 }}>
        Edit Account
      </Button>
    </FormControl>
  );
};

const AccountSettingsPage = () => {
  const navigate = useNavigate();
  const [currentUser] = useContext(AuthContext);

  const [inEditMode, setInEditMode] = useState(false);
  if (!currentUser) navigate('/');
  return (
    currentUser && (
      <Container sx={{ mt: 7 }} className='currentUser' maxWidth='lg'>
        <Grid container spacing={2}>
          <Grid xs={10} item>
            <Typography variant='h1'>My Account</Typography>
            <Typography variant='h2'>Personal Information</Typography>
          </Grid>
          <Grid xs={2} item>
            <Button
              sx={{ mt: 2 }}
              variant='contained'
              onClick={() => setInEditMode(!inEditMode)}
              fullWidth
            >
              {!inEditMode ? 'Edit' : 'Discard edits'}
            </Button>
          </Grid>
        </Grid>

        {!inEditMode ? <AccountInfoView formValues={''} /> : <EditAccountInfo formValues={''} />}
      </Container>
    )
  );
};

export default AccountSettingsPage;
