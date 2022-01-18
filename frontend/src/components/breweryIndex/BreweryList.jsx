import { Box, Grid, Typography } from '@mui/material';
import BreweryCardSideImage from '../misc/BreweryCardSideImage';

const BreweryList = ({ breweries }) => {
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

export default BreweryList;
