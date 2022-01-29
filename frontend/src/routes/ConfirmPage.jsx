import { Link, Container, Typography, Button, Box, Alert, AlertTitle } from '@mui/material';
import { useState, useContext } from 'react';
import { UserContext } from '../util/UserContext';

const ConfirmPage = () => {
   const currentUser = useContext(UserContext);
   const [didLinkSend, setDidLinkSend] = useState(false);

   const onClick = () => {
      const sendConfirmLinkRequest = async () => {
         try {
            const requestOptions = {
               headers: {
                  'x-access-token': localStorage['access-token'],
                  'x-auth-token': localStorage['refresh-token'],
               },
            };
            const response = await fetch('/api/users/confirm/resend-confirmation-email', requestOptions);
            const data = await response.json();
            console.log(data);
            setDidLinkSend('true');
         } catch (error) {
            console.error('Failed to send the resend confirmation email request to the server.');
         }
      };

      sendConfirmLinkRequest();
   };

   return (
      <Container sx={{ mt: 5 }}>
         {!didLinkSend ? (
            <Alert severity='error'>
               <AlertTitle>Please confirm your email address.</AlertTitle>
               <Typography variant='body2'>
                  We have sent a confirmation email to:{' '}
                  <Link href={`mailto:${currentUser.email}`}>{currentUser.email}</Link>.
               </Typography>
               <Typography variant='body2' sx={{ mb: 2 }}>
                  To continue using this application, you must confirm your email address.
               </Typography>

               <Typography variant='body2'>Need a new link? </Typography>
               <Typography variant='body2' sx={{ mb: 2 }}>
                  <Link component='a' sx={{ cursor: 'pointer' }} onClick={onClick}>
                     Resend confirmation link.
                  </Link>
               </Typography>

               <Typography variant='body2'>Gave us the wrong email? </Typography>
               <Typography variant='body2'>
                  <Link component='a' sx={{ cursor: 'pointer' }} onClick={onClick}>
                     Change email address.
                  </Link>
               </Typography>
            </Alert>
         ) : (
            <Alert severity='info'>
               <AlertTitle>Resent confirmation email:</AlertTitle>
               <Typography sx={{ mb: 2 }} variant='body2'>
                  We have sent another confirmation email to:{' '}
                  <Link href={`mailto:${currentUser.email}`}>{currentUser.email}</Link>.
               </Typography>

               <Typography variant='body2'>Gave us the wrong email? </Typography>
               <Typography variant='body2'>
                  <Link component='a' sx={{ cursor: 'pointer' }} onClick={onClick}>
                     Change email address.
                  </Link>
               </Typography>
            </Alert>
         )}
      </Container>
   );
};

export default ConfirmPage;
