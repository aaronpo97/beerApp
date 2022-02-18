import { Alert, Box } from '@mui/material';

const FormErrorAlert = ({ error }) => {
  return (
    <Box sx={{ width: '100%' }}>
      <Alert
        severity='error'
        sx={{
          mt: '10px',
          mb: '0em',
          padding: '0px',
          paddingLeft: '10px',
          paddingRight: '10px',
          fontSize: '0.77rem',
          height: '32px',
        }}
      >
        {error}
      </Alert>
    </Box>
  );
};

export default FormErrorAlert;
