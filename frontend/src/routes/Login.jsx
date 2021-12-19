import { ThemeProvider, Grid, CssBaseline } from '@mui/material';
import LoginForm from '../components/LoginForm';
import theme from '../theme';
import SideImage from '../components/SideImage';

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
	const navigate = useNavigate();

	useEffect(() => (localStorage.token ? navigate('/beers') : null), []);

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Grid container component='main' sx={{ height: '100vh' }}>
				<SideImage
					imageUrl={
						'https://images.pexels.com/photos/5858056/pexels-photo-5858056.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
					}
				/>
				<LoginForm />
			</Grid>
		</ThemeProvider>
	);
};

export default Login;
