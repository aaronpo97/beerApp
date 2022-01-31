import { Box, Grid, LinearProgress } from '@mui/material';
import BreweryCardSideImage from './BreweryCardSideImage';

const BreweryList = ({ breweries }) => {
  return breweries.length ? (
    <Box>
      <Grid container spacing={1}>
        {breweries.map((brewery) => (
          <BreweryCardSideImage key={brewery._id} brewery={brewery} />
        ))}
      </Grid>
    </Box>
  ) : (
    <LinearProgress />
  );
};

export default BreweryList;
