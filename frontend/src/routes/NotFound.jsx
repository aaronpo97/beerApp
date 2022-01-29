import { Container, Typography, Alert, AlertTitle } from '@mui/material';

const NotFound = () => {
   return (
      <Container sx={{ mt: 5 }}>
         <Alert severity='error'>
            <AlertTitle>404 Not Found</AlertTitle>
            <Typography variant='body2'>
               Sorry, but we are unable to locate the page you are looking for.
            </Typography>
         </Alert>
      </Container>
   );
};

export default NotFound;
