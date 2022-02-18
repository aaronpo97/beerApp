import { Alert, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
const ChangePasswordAlert = ({ message, resetForm }) => {
  const navigate = useNavigate();
  return (
    <Alert
      severity={message.type === 'error' ? 'error' : 'success'}
      action={
        <>
          <Button color='inherit' size='small' onClick={() => navigate('/account-settings')}>
            Go back to Account Settings
          </Button>
          {message.type === 'error' && (
            <Button color='inherit' size='small' sx={{ mx: 2 }} onClick={() => resetForm()}>
              Try again
            </Button>
          )}
        </>
      }
      sx={{ height: '200px', mt: 3, width: '100%' }}
    >
      {message.content}
    </Alert>
  );
};

export default ChangePasswordAlert;
