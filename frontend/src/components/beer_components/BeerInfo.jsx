import { useState, useEffect } from 'react';

import { Typography, LinearProgress, Link, Box, Grid, Paper, Card } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const BeerInfo = ({ currentBeer }) => {
   const navigate = useNavigate();
   // const likeCount = !currentBeer ? null : currentBeer.likedBy.length;

   const [currentImage, setCurrentImage] = useState('');

   useEffect(() => {
      setCurrentImage(currentBeer ? currentBeer.images[0] : '');
   }, [currentBeer]);
   return !currentBeer ? (
      <LinearProgress />
   ) : (
      <Box sx={{ mt: '50px' }}>
         <Grid spacing={2} container>
            <Grid item md={1}>
               {currentBeer.images.map(image => {
                  return (
                     <Box
                        key={image._id}
                        onClick={() => setCurrentImage(image)}
                        sx={{ cursor: 'pointer' }}
                     >
                        <img
                           src={image.url}
                           style={{ height: '100%', width: '100%', objectFit: 'cover' }}
                           alt=''
                        />
                     </Box>
                  );
               })}
            </Grid>
            <Grid item md={4}>
               <Box sx={{ height: 800 }}>
                  <img
                     src={currentBeer.images.length ? currentImage.url : ''}
                     style={{ height: '100%', width: '100%', objectFit: 'cover' }}
                     alt=''
                  />
               </Box>
            </Grid>
            <Grid item md={7}>
               <Card sx={{ height: '100%' }}>
                  <Box>
                     <Typography variant='h1' sx={{ fontSize: '40pt' }}>
                        {currentBeer.name}
                     </Typography>

                     <Typography sx={{ mb: '10px' }} variant='h2'>
                        <Link
                           underline='hover'
                           onClick={() => navigate(`/breweries/${currentBeer.brewery._id}`)}
                        >
                           {currentBeer.brewery.name}
                        </Link>
                     </Typography>

                     <Typography gutterBottom variant='h3'>
                        posted by:{' '}
                        <Link
                           underline='hover'
                           onClick={() => navigate(`/profile/${currentBeer.postedBy._id}`)}
                        >
                           {currentBeer.postedBy.username}
                        </Link>
                     </Typography>
                  </Box>
                  <Box>
                     <Typography gutterBottom variant='h2'>
                        About
                     </Typography>

                     <Typography variant='h3' gutterBottom>
                        Type: {currentBeer.type}
                     </Typography>

                     <Grid container sx={{ mb: '1em' }}>
                        {currentBeer.abv && (
                           <Grid item md={6}>
                              <Typography variant='h3'>{currentBeer.abv}% ABV </Typography>
                           </Grid>
                        )}
                        {currentBeer.ibu && (
                           <Grid item md={6}>
                              <Typography variant='h3'>{currentBeer.ibu} IBU </Typography>{' '}
                           </Grid>
                        )}
                     </Grid>

                     <Typography variant='body1'>{currentBeer.description}</Typography>
                  </Box>
               </Card>
            </Grid>
         </Grid>
      </Box>
   );
};

export default BeerInfo;
