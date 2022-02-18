import { Grid, Container } from '@mui/material';

import RegistrationForm from '../../components/user_functions/RegistrationForm';

const Register = () => {
  return (
    <Container>
      <Grid container component='main' sx={{ height: '100vh' }}>
        <RegistrationForm />
      </Grid>
    </Container>
  );
};

export default Register;
