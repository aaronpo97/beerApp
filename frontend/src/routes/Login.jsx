import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ThemeProvider, Grid, CssBaseline } from '@mui/material';
import LoginForm from '../components/LoginForm';
import theme from '../theme';
import SideImage from '../components/misc/SideImage';

class AuthenticationError extends Error {
	constructor(message) {
		super();
		this.message = message;
	}
}

const Login = () => {
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
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Grid container component='main' sx={{ height: '100vh' }}>
				<SideImage
					imageUrl={
						'https://images.pexels.com/photos/5858056/pexels-photo-5858056.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
					}
				/>
				<LoginForm
					handleLogin={handleLogin}
					username={username}
					setUsername={setUsername}
					password={password}
					setPassword={setPassword}
				/>
			</Grid>
		</ThemeProvider>
	);
};

export default Login;
