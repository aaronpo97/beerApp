import { useState, useEffect, useContext } from 'react';

import { UserContext } from '../util/UserContext';

import { Container, Box, Typography, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AccountSettingsPage = () => {
   const navigate = useNavigate();
   const currentUser = useContext(UserContext);

   const [userInformation, setUserInformation] = useState(null);

   useEffect(() => {
      const fetchData = async () => {
         const requestOptions = {
            method: 'GET',
            headers: {
               'x-access-token': localStorage['access-token'],
               'x-auth-token': localStorage['refresh-token'],
            },
         };
         const url = `/api/users/${currentUser._id}`;
         const response = await fetch(url, requestOptions);
         if (response.status === 404) return;
         if (response.status === 401) {
            localStorage.clear();
            navigate('/login');
         }
         if (response.status === 403) {
            navigate('/confirmaccount');
         }
         const result = await response.json();
         if (!result.payload) return;
         localStorage['access-token'] = result.payload.newAccessToken || localStorage['access-token'];

         setUserInformation(result.payload);
      };
      fetchData();
   }, [currentUser, navigate]);

   return (
      userInformation && (
         <Container sx={{ mt: 7 }} className='currentUser' maxWidth='lg'>
            <Typography variant='h1'>My Account</Typography>

            <Typography variant='h2'>Personal Information</Typography>

            <Typography variant='body2'>Email: {userInformation.email}</Typography>

            <Typography variant='body2'>{userInformation.dateOfBirth}</Typography>
         </Container>
      )
   );
};

export default AccountSettingsPage;
