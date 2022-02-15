import { Typography, AlertTitle, Alert, Container } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../util/AuthContext';

const ConfirmAccount = () => {
  const { userId, confirmationToken } = useParams();

  const [confirmationRequestSent, setConfirmationRequestSent] = useState(false);
  const [confirmationSuccess, setConfirmationSuccess] = useState(false);

  const [currentUser, dispatch] = useContext(AuthContext);

  useEffect(() => {
    const confirmationRequest = async () => {
      const link = `/api/users/confirm/${userId}/${confirmationToken}`;
      const requestOptions = { method: 'PUT' };

      const response = await fetch(link, requestOptions);
      const data = await response.json();

      console.log(data);

      setConfirmationRequestSent(true);
      if (response.status === 200) {
        setConfirmationSuccess(true);
        dispatch({ type: 'CONFIRM_USER_ACCOUNT', payload: { isAccountConfirmed: true } });
        return;
      }
      setConfirmationSuccess(false);
      return;
    };

    confirmationRequest();
  }, [confirmationToken, userId, dispatch]);

  return confirmationRequestSent && currentUser ? (
    <Container sx={{ mt: 5 }}>
      {confirmationSuccess ? (
        <Alert severity='success'>
          <AlertTitle>Account successfully confirmed.</AlertTitle>
          Thank you for confirming your account!
        </Alert>
      ) : (
        <Alert severity='error'>
          <AlertTitle>Account confirmation failed!</AlertTitle>
          Could not confirm your account. Please request a new confirmation email:
        </Alert>
      )}
    </Container>
  ) : (
    <Typography>Confirming account...</Typography>
  );
};

export default ConfirmAccount;
