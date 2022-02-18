import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../util/AuthContext';
import { FormControl, Grid, TextField, Box, Link, Typography } from '@mui/material';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

const ViewAccountInfo = () => {
  const [currentUser] = useContext(AuthContext);
  const navigate = useNavigate();
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
          <Link onClick={() => navigate('/user/updatename')}>
            <Typography variant='caption' sx={{}}>
              Update name
            </Typography>
          </Link>
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

      <Box>
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

        <Typography variant='caption' sx={{}}>
          <Link onClick={() => navigate('/user/updateemail')}>Update email</Link>
        </Typography>
      </Box>
      <Box>
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
        <Typography variant='caption' sx={{}}>
          <Link onClick={() => navigate('/user/updateusername')}>Update username</Link>
        </Typography>
      </Box>
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

      <Typography variant='caption' sx={{}}>
        <Link onClick={() => navigate('/user/updatepassword')}>Update password</Link>
      </Typography>
    </FormControl>
  );
};

export default ViewAccountInfo;
