import { useParams } from 'react-router';
import { useEffect, useState } from 'react';

import { Container } from '@mui/material';

import BeerInfo from '../components/BeerInfo';

const InfoPage = () => {
   const { id: beerID } = useParams();
   const [currentBeer, setCurrentBeer] = useState(undefined);

   //fetch beer data
   useEffect(() => {
      const getBeerData = async () => {
         try {
            const url = `http://localhost:5000/beers/${beerID}?populate=true`;
            const headers = {
               'x-access-token': localStorage['access-token'],
               'x-auth-token': localStorage['refresh-token'],
            };
            const response = await fetch(url, { headers });
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
      <Container>
         <BeerInfo currentBeer={currentBeer} />
      </Container>
   );
};

export default InfoPage;
