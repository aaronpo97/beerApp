import { Container, Box, Typography, Button, Grid } from '@mui/material';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';

import { useNavigate } from 'react-router-dom';

import BeerList from '../components/beerIndex/BeerList';

const Beers = () => {
   const navigate = useNavigate();
   return (
      <Box>
         <Box>
            <img
               style={{ height: '30em', width: '100%', objectFit: 'cover' }}
               src={'https://source.unsplash.com/random?biergarten'}
               alt='A drinking patio at a bar.'
            />
         </Box>
         <Container maxWidth={'lg'}>
            <Grid container sx={{ mt: 5 }}>
               <Grid item md={10} sm={12}>
                  <Typography variant='h1'>The Biergarten Index</Typography>
                  <Typography variant='h2' gutterBottom sx={{ mb: '1em' }}>
                     Beers
                  </Typography>
               </Grid>
               <Grid md={2} sm={12} item>
                  <Button
                     startIcon={<AddCircleOutlinedIcon />}
                     onClick={() => navigate('/beers/create')}
                     variant='contained'
                  >
                     Post a new beer
                  </Button>
               </Grid>
            </Grid>

            <BeerList />
         </Container>
      </Box>
   );
};

export default Beers;
