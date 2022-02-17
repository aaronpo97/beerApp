import { Grid } from '@mui/material';

import LoginForm from '../../components/user_functions/LoginForm';
import SideImage from '../../components/utilities/SideImage';

const Login = () => {
  return (
    <Grid container component='main' sx={{ height: '100vh' }}>
      <SideImage
        imageUrl={
          'https://images.pexels.com/photos/5858056/pexels-photo-5858056.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
        }
      />
      <LoginForm />
    </Grid>
  );
};

export default Login;
