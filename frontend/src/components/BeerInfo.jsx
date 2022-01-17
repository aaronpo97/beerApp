import { Typography, LinearProgress, Link, Box, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const BeerInfo = ({ currentBeer }) => {
   const navigate = useNavigate();
   const likeCount = !currentBeer ? null : currentBeer.likedBy.length;

   return !currentBeer ? (
      <LinearProgress />
   ) : (
      <Box key={currentBeer._id}>
         <Grid container sx={{ mt: '2em' }}>
            <Grid item md={5}>
               <Box sx={{ width: 450, height: 800 }}>
                  <img
                     src={currentBeer.images.length ? currentBeer.images[0].url : ''}
                     style={{ height: '100%', width: '100%', objectFit: 'cover' }}
                     alt=''
                  />
               </Box>
            </Grid>
            <Grid item md={7} sx={{ mt: '2em' }}>
               <Typography variant='h1'>{currentBeer.name}</Typography>

               <Typography gutterBottom variant='h2'>
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
               <Typography variant='h2' gutterBottom>
                  About
               </Typography>
               <Typography variant='h3' gutterBottom>
                  Type: {currentBeer.type}
               </Typography>
               <Typography variant='h3' gutterBottom>
                  {currentBeer.abv}% ABV{' '}
               </Typography>
               <Typography variant='h3' gutterBottom>
                  {currentBeer.ibu} IBU{' '}
               </Typography>

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
            </Grid>
         </Grid>
      </Box>
   );
};

export default BeerInfo;
