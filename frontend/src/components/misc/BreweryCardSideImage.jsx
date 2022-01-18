import { Card, CardContent, CardMedia, Typography, Link, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { Stack } from '@mui/material';

const BreweryCardSideImage = ({ brewery, size = 'large' }) => {
   const navigate = useNavigate();
   console.log(brewery);
   return (
      <Stack spacing={1}>
         <Card elevation={5} sx={{ marginTop: '1em' }}>
            <Grid container>
               <Grid item md={4}>
                  <CardMedia
                     component='img'
                     height={'100%'}
                     onClick={() => navigate(`/breweries/${brewery._id}`)}
                     image={brewery.images.length ? brewery.images[0].url : ''}
                  />
               </Grid>
               <Grid item md={8}>
                  <CardContent sx={{ padding: '2em' }}>
                     <Typography variant={'h2'} sx={{ fontSize: '3rem' }}>
                        <Link
                           underline='hover'
                           onClick={() => navigate(`/breweries/${brewery._id}`)}
                        >
                           {brewery.name}
                        </Link>
                     </Typography>
                     <Typography variant={'h2'} sx={{ fontSize: '1.5rem' }}>
                        {brewery.location.place_name}
                     </Typography>

                     <Typography variant='body1' sx={{ mt: '1em' }} color='text.secondary'>
                        {brewery.description}
                     </Typography>
                  </CardContent>
               </Grid>
            </Grid>
         </Card>
      </Stack>
   );
};

export default BreweryCardSideImage;
