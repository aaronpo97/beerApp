import { createTheme } from '@mui/material/styles';
const theme = createTheme({
  palette: {
    primary: { main: '#111111' },
    secondary: { main: '#e5ebff' },
    error: { main: '#800020' },
    background: {
      default: '#ffffff',
      paper: '#f9f9f9',
    },
  },
  typography: {
    h1: { fontSize: '3.5rem', fontWeight: 500 },
    h2: { fontSize: '2rem', fontWeight: 400 },
    h3: { fontSize: '1.3rem', fontWeight: 400 },
    h4: { fontSize: '1rem' },
    h5: { fontSize: '1rem' },
    body1: { fontSize: '12pt' },
    body2: { fontSize: '12pt' },
    fontFamily: ['Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'].join(','),
  },
});

export default theme;
