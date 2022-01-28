import { Box, Grid } from '@mui/material';
import BreweryCardSideImage from './BreweryCardSideImage';

const BreweryList = ({ breweries }) => {
   return (
      <Box>
         <Grid container spacing={1}>
            {breweries.map(brewery => (
               <BreweryCardSideImage key={brewery._id} brewery={brewery} />
            ))}
         </Grid>
      </Box>
   );
};

export default BreweryList;
