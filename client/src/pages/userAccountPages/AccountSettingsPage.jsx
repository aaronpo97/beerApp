import { useContext, useState, useEffect } from 'react';

import { AuthContext } from '../../util/AuthContext';

import { Container, Typography, Box, Link, FormControl, TextField, Grid, Button, Alert } from '@mui/material';

import { useNavigate } from 'react-router-dom';
import ViewAccountInfo from '../../components/user_functions/ViewAccountInfo';

const AccountSettingsPage = () => {
  const navigate = useNavigate();
  const [currentUser] = useContext(AuthContext);

  if (!currentUser) navigate('/');
  return (
    currentUser && (
      <Container sx={{ mt: 7 }} className='currentUser' maxWidth='lg'>
        <Box>
          <Typography variant='h1'>My Account</Typography>
          <Typography variant='h2'>Personal Information</Typography>

          <ViewAccountInfo />

          <Grid container>
            <Grid item md={4} sx={{ textAlign: 'center' }}>
              <Link onClick={() => navigate('/updateusername')}>Update username</Link>
            </Grid>
            <Grid item md={4} sx={{ textAlign: 'center' }}>
              <Link onClick={() => navigate('/updatename')}>Update name</Link>
            </Grid>
            <Grid item md={4} sx={{ textAlign: 'center' }}>
              <Link onClick={() => navigate('/updateemail')}>Update email</Link>
            </Grid>
          </Grid>
        </Box>
      </Container>
    )
  );
};

export default AccountSettingsPage;
