import { useState, useContext } from 'react';
import { Box } from '@mui/material';
import { UserContext } from '../util/UserContext';

import AccountNotConfirmedWarning from '../components/confirmAccount_components/AccountNotConfirmedWarning';
import UpdateEmailForm from '../components/confirmAccount_components/UpdateEmailForm';
import SentConfirmationEmailAlert from '../components/confirmAccount_components/SentConfirmationEmailAlert';

const AccountNotConfirmedDialog = () => {
  const currentUser = useContext(UserContext);

  const onClick = async () => {
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
      setRequestSent(true);
    } catch (error) {
      console.error('Failed to send the resend confirmation email request to the server.');
    }
  };

  const [updatedEmail, setUpdatedEmail] = useState('');
  const [showEmailUpdateField, setShowEmailUpdateField] = useState(false);
  const [requestSent, setRequestSent] = useState(false);

  const sendEmailChangeRequest = async () => {
    const requestOptions = {
      method: 'PUT',
      headers: {
        'x-access-token': localStorage['access-token'],
        'x-auth-token': localStorage['refresh-token'],
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: updatedEmail }),
    };

    const url = `/api/users/${currentUser._id}/changeemail`;
    const response = await fetch(url, requestOptions);
    const data = await response.json();
    await onClick();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendEmailChangeRequest().then(() => console.log('changed email'));
  };

  return (
    currentUser && (
      <Box sx={{ mb: 5 }}>
        {!requestSent &&
          (!showEmailUpdateField ? (
            <AccountNotConfirmedWarning
              setShowEmailUpdateField={setShowEmailUpdateField}
              onClick={onClick}
            />
          ) : (
            <UpdateEmailForm
              setUpdatedEmail={setUpdatedEmail}
              updatedEmail={updatedEmail}
              handleSubmit={handleSubmit}
            />
          ))}

        {requestSent && <SentConfirmationEmailAlert updatedEmail={updatedEmail} />}
      </Box>
    )
  );
};

export default AccountNotConfirmedDialog;
