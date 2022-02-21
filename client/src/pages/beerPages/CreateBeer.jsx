import { useState, useEffect } from 'react';
import { Container, Box, Typography, Button, Grid } from '@mui/material';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

import CreateBeerForm from '../../components/beer_components/CreateBeerForm';

const CreateBeer = () => {
  const navigate = useNavigate();

  return (
    <Box>
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
        <CreateBeerForm />
      </Container>
    </Box>
  );
};
export default CreateBeer;
