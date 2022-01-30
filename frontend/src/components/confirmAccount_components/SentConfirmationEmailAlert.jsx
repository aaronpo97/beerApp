import { useContext } from 'react';
import { Alert, AlertTitle, Typography, Link } from '@mui/material';
import { UserContext } from '../../util/UserContext';
const SentConfirmationEmailAlert = ({ updatedEmail }) => {
  const currentUser = useContext(UserContext);
  return (
    <Alert severity="info">
      <AlertTitle>Resent confirmation email:</AlertTitle>
      <Typography sx={{ mb: 2 }} variant="body2">
        Your confirmaion email has been sent to{' '}
        <Link href={`mailto:${updatedEmail || currentUser.email}`}>
          {updatedEmail || currentUser.email}
        </Link>
      </Typography>
    </Alert>
  );
};

export default SentConfirmationEmailAlert;
