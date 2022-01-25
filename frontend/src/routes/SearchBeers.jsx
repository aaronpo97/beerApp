import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import BeerCard from '../components/beer_components/BeerCard';

import { Box, Container } from '@mui/material';
import { Masonry } from '@mui/lab';
import BeerCardSideImage from '../components/beer_components/BeerCardSideImage';

const SearchBeers = () => {
   const [results, setResults] = useState([]);
   const [searchParams] = useSearchParams();
   const parameters = Object.fromEntries([...searchParams]);
   const { type } = parameters;
   useEffect(() => {
      const getSearchResults = async () => {
         const requestOptions = {
            method: 'GET',
            headers: {
               'x-access-token': localStorage['access-token'],
               'x-auth-token': localStorage['refresh-token'],
            },
         };
         const response = await fetch(`/api/beers/search?type=${type}`, requestOptions);

         const data = await response.json();
         setResults(data.payload);

         return data;
      };

      getSearchResults();
   }, []);

   return (
      <Box component='main'>
         <Container>
            Your search query came up with {results.length} result{results.length !== 1 ? 's' : ''}
            <>
               {results.map(beer => {
                  return <BeerCardSideImage beer={beer} key={beer._id} showLike={false} />;
               })}
            </>
         </Container>
      </Box>
   );
};

export default SearchBeers;
