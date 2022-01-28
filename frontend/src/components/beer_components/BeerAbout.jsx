import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { UserContext } from '../../util/UserContext';
import { Card, CardContent, Box, Typography, Link, Grid, Button } from '@mui/material';
const BeerAbout = ({ currentBeer }) => {
   const navigate = useNavigate();
   const user = useContext(UserContext);

   return (
      <Card>
         <CardContent>
            <Typography sx={{ mb: 1 }} variant='body1'>
               {currentBeer.description}
            </Typography>
            <Box sx={{ mb: 1 }}>
               <Typography variant='body3'>
                  posted by:{' '}
                  <Link underline='hover' onClick={() => navigate(`/profile/${currentBeer.postedBy._id}`)}>
                     {currentBeer.postedBy.username}
                  </Link>
               </Typography>
            </Box>
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
            <Box sx={{ mb: 2 }}>
               <Typography gutterBottom variant='body1'>
                  Liked by {currentBeer.likedBy.length || '0'} user
                  {currentBeer.likedBy.length !== 1 ? 's' : ''}.
               </Typography>
            </Box>
            {user?._id === currentBeer.postedBy._id && (
               <Button
                  variant={'contained'}
                  onClick={() => navigate(`/beers/${currentBeer._id}/edit`)}
                  sx={{ mt: 1 }}
               >
                  Edit
               </Button>
            )}
         </CardContent>
      </Card>
   );
};

export default BeerAbout;
