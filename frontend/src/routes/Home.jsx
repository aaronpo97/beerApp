import { ThemeProvider, Grid, CssBaseline } from '@mui/material';
import theme from '../theme';
const Home = () => {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			the biergarten app
		</ThemeProvider>
	);
};

export default Home;
