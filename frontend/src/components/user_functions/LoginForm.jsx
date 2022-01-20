import { Avatar, Button, TextField, Paper, Box, Typography, Alert } from '@mui/material';

import { Link } from 'react-router-dom';
import { Grid } from '@mui/material';

import FormErrorAlert from '../utilities/FormErrorAlert';
const LoginForm = ({ formValues, formErrors, handleSubmit, handleFormInputChange }) => {
   return (
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
         <Box
            sx={{
               my: 8,
               mx: 4,
               display: 'flex',
               flexDirection: 'column',
               alignItems: 'center',
            }}
         >
            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}></Avatar>
            <Typography component='h1' variant='h5'>
               Sign in
            </Typography>

            <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '75%' }}>
               <TextField
                  margin='normal'
                  required
                  fullWidth
                  id='username'
                  label='Username'
                  name='username'
                  value={formValues.username}
                  sx={{ mb: 0 }}
                  autoComplete='username'
                  autoFocus
                  onChange={handleFormInputChange}
                  error={formErrors.credentials || formErrors.username}
               />
               {formErrors.username && <FormErrorAlert children={formErrors.username} />}
               <TextField
                  margin='normal'
                  required
                  fullWidth
                  name='password'
                  label='Password'
                  type='password'
                  id='password'
                  sx={{ mb: 0 }}
                  autoComplete='current-password'
                  value={formValues.password}
                  onChange={handleFormInputChange}
                  error={formErrors.credentials || formErrors.password}
               />
               {formErrors.password && <FormErrorAlert children={formErrors.password} />}

               {formErrors.credentials && <FormErrorAlert children={formErrors.credentials} />}
               <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
                  Sign In
               </Button>
               <Grid container>
                  <Grid item xs>
                     <Link to={'/'}>Forgot password?</Link>
                  </Grid>
                  <Grid item>
                     <Link to={'/register'}>{"Don't have an account? Sign Up"}</Link>
                  </Grid>
               </Grid>
            </Box>
         </Box>
      </Grid>
   );
};

export default LoginForm;
