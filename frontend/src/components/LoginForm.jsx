import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';

import TextField from '@mui/material/TextField';

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';

import { Link } from 'react-router-dom';
import Copyright from './Copyright';
import { Grid } from '@mui/material';

const LoginForm = ({ handleLogin, username, setUsername, password, setPassword }) => {
	return (
		<>
			<Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
				<Box
					sx={{
						my: 8,
						mx: 4,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}>
					<Avatar sx={{ m: 1, bgcolor: 'primary.main' }}></Avatar>
					<Typography component='h1' variant='h5'>
						Sign in
					</Typography>

					<Box
						component='form'
						onSubmit={e => {
							e.preventDefault();
							handleLogin();
						}}
						noValidate
						sx={{ mt: 1 }}>
						<TextField
							margin='normal'
							required
							fullWidth
							id='username'
							label='Username'
							name='username'
							value={username}
							autoComplete='username'
							autoFocus
							onChange={e => setUsername(e.target.value)}
						/>
						<TextField
							margin='normal'
							required
							fullWidth
							name='password'
							label='Password'
							type='password'
							id='password'
							autoComplete='current-password'
							value={password}
							onChange={e => setPassword(e.target.value)}
						/>

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
						<Copyright sx={{ mt: 5 }} />
					</Box>
				</Box>
			</Grid>
		</>
	);
};

export default LoginForm;
