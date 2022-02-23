import { useState } from 'react';
import { Container, Box, Typography, Button, Grid, LinearProgress } from '@mui/material';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import CreateBreweryForm from '../../components/brewery_components/CreateBreweryForm';

const CreateBrewery = () => {
  const navigate = useNavigate();
  const [isNewBreweryLoading, setIsNewBreweryLoading] = useState(false);
  return (
    <Box>
      {isNewBreweryLoading ? (
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
        <Container sx={{ marginTop: 4 }}>
          <Grid container sx={{ mt: 5 }}>
            <Grid item md={10} sm={12}>
              <Typography variant='h1'>The Biergarten Index</Typography>
              <Typography variant='h2' gutterBottom sx={{ mb: '1em' }}>
                Breweries
              </Typography>
            </Grid>
            <Grid md={2} sm={12} item>
              <Button
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate('/breweries')}
                variant='contained'
                sx={{ width: '100%' }}
              >
                Go back
              </Button>
            </Grid>
          </Grid>
          <CreateBreweryForm setIsNewBreweryLoading={setIsNewBreweryLoading} />
        </Container>
      )}
    </Box>
  );
};
export default CreateBrewery;
