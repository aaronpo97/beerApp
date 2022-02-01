import { useContext } from 'react';

import { AuthContext } from '../util/AuthContext';

import { Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AccountSettingsPage = () => {
  const navigate = useNavigate();
  const [currentUser] = useContext(AuthContext);

  if (!currentUser) navigate('/');
  return (
    currentUser && (
      <Container sx={{ mt: 7 }} className='currentUser' maxWidth='lg'>
        <Typography variant='h1'>My Account</Typography>

        <Typography variant='h2'>Personal Information</Typography>

        <Typography>
          {currentUser.firstName}
          {currentUser.lastName}
        </Typography>
        <Typography>{currentUser.email}</Typography>
      </Container>
    )
  );
};

export default AccountSettingsPage;
