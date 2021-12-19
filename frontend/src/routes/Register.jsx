import { ThemeProvider, Grid, CssBaseline } from '@mui/material';
import RegisterForm from '../components/RegisterForm';
import theme from '../theme';
import SideImage from '../components/SideImage';

const Login = () => {
	return (
		<Grid container component='main' sx={{ height: '100vh' }}>
			<SideImage
				imageUrl={
					'https://images.pexels.com/photos/5659494/pexels-photo-5659494.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
				}
			/>
			<RegisterForm />
		</Grid>
	);
};

export default Login;
