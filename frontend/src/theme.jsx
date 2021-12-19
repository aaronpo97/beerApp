import { createTheme } from '@mui/material/styles';
const theme = createTheme({
	palette: {
		primary: { main: '#272731' },
		secondary: { main: '#e5ebff' },
		error: { main: '#d32f2f' },
	},
	typography: {
		fontFamily: [
			'-apple-system',
			'BlinkMacSystemFont',
			'"Segoe UI"',
			'Roboto',
			'"Helvetica Neue"',
			'Arial',
			'sans-serif',
			'"Apple Color Emoji"',
			'"Segoe UI Emoji"',
			'"Segoe UI Symbol"',
		].join(','),
	},
});

export default theme;
