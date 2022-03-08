import { useState, useEffect, useContext } from 'react';
import { LinearProgress, Box } from '@mui/material';
import { Masonry } from '@mui/lab';

import BeerCard from './BeerCard';
import { AuthContext } from '../../util/AuthContext';
import getBeerData from '../../api/getBeerData';
const BeerList = () => {
  const [, dispatch] = useContext(AuthContext);

  const [beers, setBeers] = useState([]);

  useEffect(() => {
    (async () => {
      const beerData = await getBeerData(dispatch);
      setBeers(beerData);
    })();
  }, [dispatch]);

  return !beers.length ? (
    <LinearProgress />
  ) : (
    <Box component='main'>
      <Masonry
        columns={{ xs: 1, sm: 1, md: 2, lg: 3, xl: 3 }}
        spacing={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 2 }}
        sx={{ mb: 0 }}
      >
        {beers.map((beer) => (
          <BeerCard key={beer._id} beer={beer} />
        ))}
      </Masonry>
    </Box>
  );
};
export default BeerList;
