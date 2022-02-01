import { useContext } from 'react';
import { Alert, AlertTitle, Typography, Link } from '@mui/material';
import { AuthContext } from '../../util/AuthContext';
const SentConfirmationEmailAlert = ({ updatedEmail }) => {
  const currentUser = useContext(AuthContext);
  return (
    <Alert severity='info'>
      <AlertTitle>Resent confirmation email:</AlertTitle>
      <Typography sx={{ mb: 2 }} variant='body2'>
        Your confirmaion email has been sent to{' '}
        <Link href={`mailto:${updatedEmail || currentUser.email}`}>
          {updatedEmail || currentUser.email}
        </Link>
      </Typography>
    </Alert>
  );
};

export default SentConfirmationEmailAlert;
