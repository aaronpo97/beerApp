import { createTheme } from '@mui/material/styles';
const theme = createTheme({
	palette: {
		primary: { main: '#272731' },
		secondary: { main: '#e5ebff' },
		error: { main: '#d32f2f' },
	},
	typography: {
		h1: {
			fontSize: '3.5rem',
			fontWeight: 400,
		},
		h2: {
			fontSize: '2rem',
			fontWeight: 300,
		},
		h3: {
			fontSize: '1.2rem',
		},
		h4: {
			fontSize: '1rem',
		},
		h5: {
			fontSize: '1rem',
		},
		fontFamily: ['-apple-system', 'BlinkMacSystemFont', '"Helvetica Neue"', 'Arial', 'sans-serif'].join(','),
	},
});

export default theme;
