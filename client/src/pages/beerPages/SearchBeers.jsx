import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Box, Container } from '@mui/material';

import BeerCardSideImage from '../../components/beer_components/BeerCardSideImage';

const SearchBeers = () => {
  // eslint-disable-next-line no-unused-vars
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

      return data;
    };

    getSearchResults();
  }, [type]);

  return (
    <Box component='main'>
      <Container>
        Your search query came up with {results.length} result{results.length !== 1 ? 's' : ''}
        <>
          {results.map((beer) => {
            return <BeerCardSideImage beer={beer} key={beer._id} showLike={false} />;
          })}
        </>
      </Container>
    </Box>
  );
};

export default SearchBeers;
