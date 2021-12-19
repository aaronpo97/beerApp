import { ThemeProvider, Grid, CssBaseline } from '@mui/material';
import theme from '../theme';
const Home = () => {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
		</ThemeProvider>
	);
};

export default Home;
