import { useParams, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';

import { Container, Box, Grid, LinearProgress } from '@mui/material';

import BeerInfoHeader from '../components/beer_components/BeerInfoHeader';
import ImageCarousel from '../components/utilities/ImageCarousel';
import BeerAbout from '../components/beer_components/BeerAbout';
import CommentSection from '../components/comment_components/CommentSection';

const BeerInfo = ({ currentBeer }) => {
   const [comments, setComments] = useState([]);

   useEffect(() => {
      if (!currentBeer) return;
      setComments(currentBeer.comments);
   }, [currentBeer]);

   return !currentBeer ? (
      <LinearProgress />
   ) : (
      <Box sx={{ mt: '3em' }}>
         <BeerInfoHeader currentBeer={currentBeer} />
         <Grid container spacing={2} component='main' sx={{ mt: 2 }}>
            <Grid md={4} item>
               <BeerAbout currentBeer={currentBeer} />
            </Grid>
            <Grid md={8} item>
               <CommentSection currentBeer={currentBeer} comments={comments} setComments={setComments} />
            </Grid>
         </Grid>
      </Box>
   );
};

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
   }, [beerID, navigate]);

   useEffect(() => console.log(currentBeer), [currentBeer]);

   return currentBeer ? (
      <>
         <ImageCarousel images={currentBeer.images} />
         <Container maxWidth='lg'>
            <BeerInfo currentBeer={currentBeer} />
         </Container>
      </>
   ) : null;
};

export default InfoPage;
