import { useContext } from 'react';

import { AuthContext } from '../../util/AuthContext';

import { Container, Typography, Box } from '@mui/material';

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
        </Box>
      </Container>
    )
  );
};

export default AccountSettingsPage;
