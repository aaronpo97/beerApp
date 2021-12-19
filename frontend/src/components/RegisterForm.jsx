import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';

import TextField from '@mui/material/TextField';

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';

import { useNavigate } from 'react-router-dom';

import { Link } from 'react-router-dom';
import Copyright from './Copyright';
import { ThemeProvider, Grid, CssBaseline } from '@mui/material';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

import theme from '../theme';

class AuthenticationError extends Error {
	constructor(message) {
		super();
		this.message = message;
	}
}

const RegisterForm = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');
	const [dateOfBirth, setDateOfBirth] = useState('');

	const navigate = useNavigate();

	const login = async () => {
		const headers = { 'Content-Type': 'application/json' };
		const body = JSON.stringify({ username, password });

		const response = await fetch('http://localhost:5000/login', {
			headers,
			body,
			method: 'POST',
		});
		const data = await response.json();
		localStorage.setItem('token', data.token);

		navigate('/beers');
	};

	const registerAccount = async event => {
		event.preventDefault();

		const headers = { 'Content-Type': 'application/json' };
		const body = JSON.stringify({
			username,
			password,
			dateOfBirth,
			email,
			profile: {},
		});
		const requestOptions = { headers, body, method: 'POST' };

		const response = await fetch('http://localhost:5000/register', requestOptions);
		if (response.status !== 201) {
			setUsername('');
			setPassword('');
			setEmail('');
			setDateOfBirth('');
		}
	};

	return (
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
					Register
				</Typography>

				<Box
					component='form'
					onSubmit={registerAccount}
					noValidate
					sx={{ mt: 1 }}>
					<Box>
						<TextField
							margin='normal'
							required
							fullWidth
							id='email'
							label='Email'
							name='email'
							value={email}
							autoComplete='email'
							autoFocus
							onChange={e => setEmail(e.target.value)}
						/>
					</Box>
					<Box>
						<LocalizationProvider dateAdapter={AdapterDateFns}>
							<DatePicker
								label='date of birth'
								value={dateOfBirth}
								onChange={newValue => {
									setDateOfBirth(newValue);
								}}
								renderInput={params => <TextField {...params} />}
							/>
						</LocalizationProvider>
					</Box>
					<Box>
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
					</Box>
					<Box>
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
					</Box>
					<Box>
						<Button
							type='submit'
							fullWidth
							variant='contained'
							sx={{ mt: 3, mb: 2 }}>
							Register
						</Button>
					</Box>
					<Grid container>
						<Grid item xs>
							<Link to={'/'}>Forgot password?</Link>
						</Grid>
						<Grid item>
							<Link to={'/login'}>{'Already have an account?'}</Link>
						</Grid>
					</Grid>
					<Copyright sx={{ mt: 5 }} />
				</Box>
			</Box>
		</Grid>
	);
};

export default RegisterForm;
