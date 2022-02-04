import { useContext, useState, useEffect } from 'react';

import { AuthContext } from '../util/AuthContext';

import { Container, Typography, Box } from '@mui/material';

import { useNavigate } from 'react-router-dom';
import ViewAccountInfo from '../components/user_functions/ViewAccountInfo';

const AccountSettingsPage = () => {
  const navigate = useNavigate();
  const [currentUser] = useContext(AuthContext);

  const [formValues, setFormValues] = useState({});

  useEffect(() => {
    setFormValues(currentUser);
  }, [currentUser]);

  if (!currentUser) navigate('/');
  return (
    currentUser && (
      <Container sx={{ mt: 7 }} className='currentUser' maxWidth='lg'>
        <Box>
          <Typography variant='h1'>My Account</Typography>
          <Typography variant='h2'>Personal Information</Typography>
        </Box>

        {/* <ViewAccountInfo /> */}

        <Box sx={{ mt: 1 }}>
          <Typography variant='h3'>Name</Typography>
          <Typography variant='h4'>
            {formValues.firstName} {formValues.lastName}
          </Typography>
        </Box>
        <Box sx={{ mt: 1 }}>
          <Typography variant='h3'>Username</Typography>
          <Typography variant='h4'>{formValues.username}</Typography>
        </Box>
        <Box sx={{ mt: 1 }}>
          <Typography variant='h3'>Email</Typography>
          <Typography variant='h4'>{formValues.email}</Typography>
        </Box>
      </Container>
    )
  );
};

export default AccountSettingsPage;
