import { createTheme } from '@mui/material/styles';
const theme = createTheme({
   palette: {
      primary: { main: '#111111' },
      secondary: { main: '#e5ebff' },
      error: { main: '#800020' },
   },
   typography: {
      h1: { fontSize: '3.5rem', fontWeight: 400 },
      h2: { fontSize: '2rem', fontWeight: 300 },
      h3: { fontSize: '1.2rem' },
      h4: { fontSize: '1rem' },
      h5: { fontSize: '1rem' },
      body1: { fontSize: '10pt' },
      fontFamily: ['"Noto Sans","Helvetica Neue"', 'Arial', 'sans-serif'].join(','),
   },
});

export default theme;
