import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Box, Grid, Typography } from '@mui/material';
import BreweryCardSideImage from '../misc/BreweryCardSideImage';

export default ({ breweries, setSortingDirection, setSortingParam }) => {
  const navigate = useNavigate();
  return (
    <Box sx={{ mt: '2em' }}>
      <Typography variant='h1'>The Biergarten Index</Typography>
      <Typography variant='h2' gutterBottom sx={{ mb: '1em' }}>
        Breweries
      </Typography>
      <Grid container spacing={1}>
        {breweries.map(brewery => (
          <BreweryCardSideImage brewery={brewery} />
        ))}
      </Grid>
    </Box>
  );
};
