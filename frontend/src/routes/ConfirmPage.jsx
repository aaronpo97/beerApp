import { Container, Typography, Button, Box } from '@mui/material';
import { useState } from 'react';

const ConfirmPage = () => {
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
      <Container>
         {!didLinkSend ? (
            <Box>
               <Typography variant='h1'>
                  You gotta confirm your account dude! Or else you cannot access this site lol
               </Typography>

               <Button variant='contained' onClick={onClick}>
                  Click me to send you a new confirmation link!
               </Button>
            </Box>
         ) : (
            <Box>
               <Typography variant='h1'>Link sent. Please check your email!</Typography>
            </Box>
         )}
      </Container>
   );
};

export default ConfirmPage;
