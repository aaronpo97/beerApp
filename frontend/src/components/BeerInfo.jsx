import { useState, useEffect } from 'react';

import { Typography, LinearProgress, Link, Box, Grid, Paper } from '@mui/material';
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
            <Grid item md={6}>
               <Box sx={{ height: '100%', width: '100%', padding: 4 }}>
                  <Paper elevation={5} sx={{ padding: 1.5, mb: '30px' }}>
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
                  </Paper>
                  <Paper elevation={5} sx={{ height: '70%', padding: 1.5 }}>
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

                     {/* <div>
					{likeCount} like{likeCount > 1 ? 's' : ''}
				</div>
				{currentBeer.likedBy.map(like => (
					<div>
						<Link onClick={() => navigate(`/profile/${like._id}`)}>
							{like.username}
						</Link>
						likes this!
					</div>
				))} */}

                     <Typography variant='body1'>{currentBeer.description}</Typography>
                  </Paper>
               </Box>
            </Grid>
         </Grid>
      </Box>
   );
};

export default BeerInfo;
