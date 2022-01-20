import { useEffect, useState } from 'react';
import { Container, Box, Grid, Typography, Button } from '@mui/material';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import { useNavigate } from 'react-router-dom';

import BreweryList from '../components/brewery_components/BreweryList';

const BreweryIndex = () => {
   const [breweries, setBreweries] = useState([]);
   const [sortingParam, setSortingParam] = useState('default');
   const [sortingDirection, setSortingDirection] = useState('default');

   const navigate = useNavigate();

   useEffect(() => {
      const fetchData = async () => {
         const requestOptions = {
            method: 'GET',
            headers: {
               'x-access-token': localStorage['access-token'],
               'x-auth-token': localStorage['refresh-token'],
            },
         };
         const url = `http://localhost:5000/api/breweries?sort=${sortingDirection}&param=${sortingParam}`;
         const response = await fetch(url, requestOptions);
         if (response.status === 401) {
            localStorage.clear();
            navigate('/login');
         }
         if (response.status === 403) {
            navigate('/confirmaccount');
         }
         const result = await response.json();
         if (!result.payload) return;
         localStorage['access-token'] = result.payload.newAccessToken || localStorage['access-token'];
         setBreweries(result.payload || []);
      };
      fetchData();
   }, [sortingParam, sortingDirection, navigate]);
   return (
      <Box>
         <Box>
            <img
               style={{ height: '30em', width: '100%', objectFit: 'cover' }}
               src={'https://source.unsplash.com/random?biergarten'}
               alt='A drinking patio at a bar.'
            />
         </Box>
         <Container maxWidth={'lg'}>
            <Grid container sx={{ mt: 5 }}>
               <Grid item md={9} sm={12}>
                  <Typography variant='h1'>The Biergarten Index</Typography>
                  <Typography variant='h2' gutterBottom sx={{ mb: '1em' }}>
                     Breweries
                  </Typography>
               </Grid>
               <Grid md={3} sm={12} item>
                  <Button
                     startIcon={<AddCircleOutlinedIcon />}
                     onClick={() => navigate('/breweries/create')}
                     variant='contained'
                     sx={{ width: '100%' }}
                  >
                     Post a new brewery
                  </Button>
               </Grid>
            </Grid>
            <BreweryList
               breweries={breweries}
               setBreweries={setBreweries}
               sortingParam={sortingParam}
               setSortingParam={setSortingParam}
               sortingDirection={sortingDirection}
               setSortingDirection={setSortingDirection}
            />
         </Container>
      </Box>
   );
};
export default BreweryIndex;
