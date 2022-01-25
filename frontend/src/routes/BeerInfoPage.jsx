import { useParams, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';

import { Container } from '@mui/material';

import BeerInfo from '../components/beer_components/BeerInfo';

const InfoPage = () => {
   const navigate = useNavigate();
   const { id: beerID } = useParams();
   const [currentBeer, setCurrentBeer] = useState(undefined);

   //fetch beer data
   useEffect(() => {
      const getBeerData = async () => {
         try {
            const url = `/api/beers/${beerID}`;
            const headers = {
               'x-access-token': localStorage['access-token'],
               'x-auth-token': localStorage['refresh-token'],
            };
            const response = await fetch(url, { headers });
            if (response.status === 401) {
               localStorage.clear();
               navigate('/login');
            }
            if (response.status === 403) {
               navigate('/confirmaccount');
            }

            const data = await response.json();

            setCurrentBeer(data.payload);
         } catch (error) {
            console.error(error);
         }
      };
      getBeerData();
   }, [beerID]);

   useEffect(() => console.log(currentBeer), [currentBeer]);

   return (
      <Container maxWidth='lg'>
         <BeerInfo currentBeer={currentBeer} />
      </Container>
   );
};

export default InfoPage;
