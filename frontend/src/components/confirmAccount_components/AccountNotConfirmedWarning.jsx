import { useContext } from 'react';
import { UserContext } from '../../util/UserContext';

import { Alert, AlertTitle, Typography, Link } from '@mui/material';

const AccountNotConfirmedWarning = ({ setShowEmailUpdateField, onClick }) => {
  const currentUser = useContext(UserContext);
  return (
    <Alert severity='error'>
      <AlertTitle>Please confirm your account.</AlertTitle>
      <Typography variant='body2'>
        We have sent a confirmation email to:{' '}
        <Link href={`mailto:${currentUser.email}`}>{currentUser.email}</Link>.
      </Typography>
      <Typography variant='body2' sx={{ mb: 2 }}>
        In order to continue using this application, you must first confirm your account.
      </Typography>

      <Typography variant='body2'>Need a new link? </Typography>
      <Typography variant='body2' sx={{ mb: 2 }}>
        <Link component='a' sx={{ cursor: 'pointer' }} onClick={onClick}>
          Resend confirmation link.
        </Link>
      </Typography>

      <Typography variant='body2'>Gave us the wrong email? </Typography>
      <Typography variant='body2'>
        <Link
          component='a'
          sx={{ cursor: 'pointer' }}
          onClick={() => setShowEmailUpdateField(true)}
        >
          Change email address.
        </Link>
      </Typography>
    </Alert>
  );
};

export default AccountNotConfirmedWarning;
