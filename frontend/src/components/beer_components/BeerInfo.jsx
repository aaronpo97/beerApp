import { useState, useEffect, useContext } from 'react';

import { UserContext } from '../../util/UserContext';
import {
   Typography,
   LinearProgress,
   Link,
   Box,
   Grid,
   Button,
   Card,
   CardContent,
   CardMedia,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const BeerInfo = ({ currentBeer }) => {
   const user = useContext(UserContext);

   console.log(currentBeer);
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
         <Card sx={{ display: 'flex' }}>
            <CardMedia
               component='img'
               image={currentBeer.images.length ? currentBeer.images[0].url : ''}
               sx={{ width: '500px' }}
               alt={currentBeer.name}
            />
            <Box component='main' sx={{ display: 'flex', flexDirection: 'column' }}>
               <CardContent sx={{ flex: '1 0 auto' }}>
                  <Box sx={{ mb: 2 }}>
                     <Grid container>
                        <Grid item md={9.5}>
                           <Typography sx={{ fontSize: '2.75rem' }} variant='h1'>
                              {currentBeer.name}
                           </Typography>
                           <Link
                              underline='hover'
                              onClick={() => navigate(`/breweries/${currentBeer.brewery._id}`)}
                           >
                              <Typography variant='h2' sx={{ fontSize: '1.5rem' }}>
                                 {currentBeer.brewery.name}
                              </Typography>
                           </Link>
                        </Grid>
                        <Grid item md={2.5}>
                           {user._id === currentBeer.postedBy._id && (
                              <Button variant={'contained'} fullWidth>
                                 Edit
                              </Button>
                           )}
                        </Grid>
                     </Grid>
                  </Box>
                  <Box sx={{ mb: 2 }}>
                     <Typography gutterBottom variant='h4'>
                        posted by:{' '}
                        <Link
                           underline='hover'
                           onClick={() => navigate(`/profile/${currentBeer.postedBy._id}`)}
                        >
                           {currentBeer.postedBy.username}
                        </Link>
                     </Typography>
                  </Box>
                  <Box sx={{ mb: 2 }}>
                     <Typography gutterBottom variant='body1'>
                        Liked by {currentBeer.likedBy.length || '0'} user
                        {currentBeer.likedBy.length !== 1 ? 's' : ''}.
                     </Typography>
                     <Typography variant='body1'>{currentBeer.description}</Typography>
                  </Box>

                  <Box>
                     <Typography variant='h3' gutterBottom>
                        About
                     </Typography>
                     <Typography variant='body2' gutterBottom>
                        Type: {currentBeer.type}
                     </Typography>
                     <Grid container spacing={2}>
                        <Grid md={6} item>
                           <Typography variant='body2'>{currentBeer.abv}% IBU</Typography>
                        </Grid>
                        <Grid md={6} item>
                           <Typography variant='body2'>{currentBeer.ibu} IBU</Typography>
                        </Grid>
                     </Grid>
                  </Box>
               </CardContent>
            </Box>
         </Card>
      </Box>
   );
};

export default BeerInfo;
