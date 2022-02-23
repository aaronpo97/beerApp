import { useState, useEffect } from 'react';
import { Container, Box, Typography, Button, Grid, LinearProgress } from '@mui/material';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

import CreateBeerForm from '../../components/beer_components/CreateBeerForm';

const CreateBeer = () => {
  const navigate = useNavigate();

  const [isNewBeerLoading, setIsNewBeerLoading] = useState(false);
  return (
    <Box>
      {isNewBeerLoading ? (
        <Container
          sx={{
            display: 'flex',
            alignItems: 'center',
            mt: `${100 / 3}vh`,
            flexDirection: 'column',
          }}
        >
          <Typography variant='h3' component='h1' sx={{ mb: 2 }}>
            Uploading images and creating new post...
          </Typography>

          <LinearProgress sx={{ width: '100%' }} />
        </Container>
      ) : (
        <Container sx={{ marginTop: 7 }}>
          <Grid container sx={{ mt: 5 }}>
            <Grid item md={10} sm={12}>
              <Typography variant='h1'>The Biergarten Index</Typography>
              <Typography variant='h2' gutterBottom sx={{ mb: '1em' }}>
                Beers
              </Typography>
            </Grid>
            <Grid md={2} sm={12} item>
              <Button
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate('/beers')}
                variant='contained'
                sx={{ width: '100%' }}
              >
                Go back
              </Button>
            </Grid>
          </Grid>
          <CreateBeerForm setIsNewBeerLoading={setIsNewBeerLoading} />
        </Container>
      )}
    </Box>
  );
};
export default CreateBeer;
