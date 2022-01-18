import { Container, Typography, Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ConfirmAccount = () => {
   const { userId, confirmationToken } = useParams();

   const [confirmationRequestSent, setConfirmationRequestSent] = useState(false);
   const [confirmationSuccess, setConfirmationSuccess] = useState(false);

   useEffect(() => {
      const confirmationRequest = async () => {
         const link = `http://localhost:5000/users/confirm/${userId}/${confirmationToken}`;
         const requestOptions = { method: 'PUT' };

         const response = await fetch(link, requestOptions);
         const data = await response.json();

         setConfirmationRequestSent(true);
         if (response.status === 200) {
            setConfirmationSuccess(true);
            return;
         }
         setConfirmationSuccess(false);
         return;
      };

      confirmationRequest();
   }, [confirmationToken, userId]);

   return (
      <Container>
         {confirmationRequestSent ? (
            <Box>
               {confirmationSuccess ? (
                  <Typography>Thank you for confirming your account!</Typography>
               ) : (
                  <Typography>Account confirmation failed. Bad link!</Typography>
               )}
            </Box>
         ) : (
            <Typography>Confirming account...</Typography>
         )}
      </Container>
   );
};

export default ConfirmAccount;
