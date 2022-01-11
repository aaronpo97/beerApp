import { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';

import TextField from '@mui/material/TextField';

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';

import { useNavigate } from 'react-router-dom';

import { Link } from 'react-router-dom';
import Copyright from './Copyright';
import { Grid } from '@mui/material';

class AuthenticationError extends Error {
	constructor(message) {
		super();
		this.message = message;
	}
}

const LoginForm = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();
	useEffect(() => {
		const redirectIfLoggedIn = async () => {
			if (!(localStorage['access-token'] && localStorage['refresh-token'])) return;
			var requestOptions = {
				method: 'GET',
				headers: {
					'x-access-token': localStorage['access-token'],
					'x-auth-token': localStorage['refresh-token'],
				},
			};

			const response = await fetch('http://localhost:5000/verifytoken', requestOptions);
			if (response.status === 200) navigate('/beers');
		};
		redirectIfLoggedIn();
	}, []);

	const handleLogin = async () => {
		try {
			if (!(username && password))
				throw new AuthenticationError('Missing username or password.');
			const response = await fetch('http://localhost:5000/users/login', {
				method: 'POST',
				headers: { 'Content-type': 'application/json' },
				body: JSON.stringify({ username, password }),
			});

			if (response.status !== 200) throw new AuthenticationError('Invalid credentials.');
			const data = await response.json();

			localStorage.setItem('access-token', data.payload.accessToken);
			localStorage.setItem('refresh-token', data.payload.refreshToken);

			navigate('/beers');
		} catch (error) {
			setUsername('');
			setPassword('');
		}
	};

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
