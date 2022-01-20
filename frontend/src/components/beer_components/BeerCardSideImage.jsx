import { Card, CardContent, CardMedia, Typography, Link, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import LikeButton from '../utilities/LikeButton';

import { Stack } from '@mui/material';

const BeerCardSideImage = ({ beer }) => {
   const navigate = useNavigate();

   return (
      <Stack spacing={1}>
         <Card elevation={5} sx={{ marginTop: '1em' }}>
            <Grid container>
               <Grid item md={4}>
                  <CardMedia
                     component='img'
                     height={'400px'}
                     onClick={() => navigate(`/beers/${beer._id}`)}
                     image={beer.images.length ? beer.images[0].url : ''}
                  />
               </Grid>
               <Grid item md={8}>
                  <CardContent sx={{ padding: '2em' }}>
                     <Typography variant={'h2'} sx={{ fontSize: '3rem' }}>
                        <Link underline='hover' onClick={() => navigate(`/beers/${beer._id}`)}>
                           {beer.name}
                        </Link>
                     </Typography>

                     {beer.brewery.name ? (
                        <Typography variant='h3' gutterBottom>
                           <Link underline='hover' onClick={() => navigate(`/breweries/${beer.brewery._id}`)}>
                              {beer.brewery.name}
                           </Link>
                        </Typography>
                     ) : null}
                     <Typography variant='body1' sx={{ mt: '1em' }} color='text.secondary'>
                        {beer.description}
                     </Typography>
                     <Typography variant='body1' sx={{ mt: '1em' }} color='text.secondary'>
                        {beer.abv}% ABV{beer.ibu ? `, ${beer.ibu} IBU` : null}
                     </Typography>

                     <Grid container>
                        <Grid item md={10}>
                           <Typography sx={{ mt: '1em' }} variant='h4'>
                              <Link underline='hover' onClick={() => navigate(``)}>
                                 {beer.type}
                              </Link>
                           </Typography>
                        </Grid>
                        <Grid item md={2}>
                           <LikeButton beer={beer} />
                        </Grid>
                     </Grid>
                  </CardContent>
               </Grid>
            </Grid>
         </Card>
      </Stack>
   );
};

export default BeerCardSideImage;
