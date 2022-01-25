import { useState, useContext } from 'react';
import Carousel from 'react-material-ui-carousel';

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
   Avatar,
   FormControl,
   TextField,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ms from 'ms';

const CommentCreateForm = () => {
   const currentUser = useContext(UserContext);

   const [comment, setComment] = useState('');
   return (
      <Box sx={{ mb: 2 }}>
         <FormControl sx={{ width: '100%' }}>
            <TextField
               id='outlined-basic'
               label='Leave a comment'
               multiline
               minRows={9}
               onChange={e => setComment(e.target.value)}
               value={comment}
               variant='outlined'
            />
         </FormControl>
      </Box>
   );
};

const CommentSection = ({ comments }) => {
   const navigate = useNavigate();
   return (
      <Box>
         <CommentCreateForm />
         {comments.map(comment => (
            <Card sx={{ mb: 2 }}>
               <CardContent>
                  <Grid container spacing={2}>
                     <Grid item md={2}>
                        <Avatar />

                        <Link underline='hover' onClick={() => navigate(`/profile/${comment.author._id}`)}>
                           <Typography variant='body2' sx={{ mt: 1 }}>
                              {comment.author.username}
                           </Typography>
                        </Link>
                        <Typography variant='body2'>
                           {ms(Date.now() - new Date(comment.timestamp), { long: true })} ago
                        </Typography>
                     </Grid>
                     <Grid item md={10}>
                        {comment.body}
                     </Grid>
                  </Grid>
               </CardContent>
            </Card>
         ))}
      </Box>
   );
};

const BeerAbout = ({ currentBeer }) => {
   const navigate = useNavigate();
   const user = useContext(UserContext);
   return (
      <>
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
      </>
   );
};

const BeerInfo = ({ currentBeer }) => {
   const navigate = useNavigate();

   return !currentBeer ? (
      <LinearProgress />
   ) : (
      <Box sx={{ mt: '50px' }}>
         <Box>
            <Typography variant='h1'>{currentBeer.name}</Typography>
            <Typography variant='h2' sx={{ mb: '1em' }}>
               <Link underline='hover' onClick={() => navigate(`/breweries/${currentBeer.brewery._id}`)}>
                  {currentBeer.brewery.name}
               </Link>
            </Typography>
         </Box>

         <Box sx={{ mt: 2 }}>
            <Carousel>
               {currentBeer.images.map(image => {
                  return (
                     <img
                        style={{ maxHeight: '500px', width: '100%', objectFit: 'cover' }}
                        src={image.url}
                        alt={currentBeer.name}
                     />
                  );
               })}
            </Carousel>
         </Box>
         <Grid container spacing={2} component='main' sx={{ mt: 2 }}>
            <Grid md={4} item>
               <BeerAbout currentBeer={currentBeer} />
            </Grid>
            <Grid md={8} item>
               <CommentSection comments={currentBeer.comments} />
            </Grid>
         </Grid>
      </Box>
   );
};

export default BeerInfo;
