import { useState, useEffect, useContext } from 'react';

import { UserContext } from '../util/UserContext';

import { Container, Box, Typography, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AccountSettingsPage = () => {
  const navigate = useNavigate();
  const currentUser = useContext(UserContext);

  if (!currentUser) navigate('/');
  return (
    currentUser && (
      <Container sx={{ mt: 7 }} className='currentUser' maxWidth='lg'>
        <Typography variant='h1'>My Account</Typography>

        <Typography variant='h2'>Personal Information</Typography>

        {/* <Typography variant='body2'>Email: {userInformation.email}</Typography>

            <Typography variant='body2'>{userInformation.dateOfBirth}</Typography> */}
      </Container>
    )
  );
};

export default AccountSettingsPage;
