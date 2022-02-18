import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Button, Container, Grid, Typography } from '@mui/material';

import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';

import { AuthContext } from '../../util/AuthContext';
import BeerList from '../../components/beer_components/BeerList';

const Beers = () => {
  const navigate = useNavigate();

  const [currentUser] = useContext(AuthContext);

  if (!currentUser._id) navigate('/login');
  return (
    <Box>
      <Container sx={{ mt: '5em ' }} maxWidth={'lg'}>
        <Grid container>
          <Grid item md={10} sm={12}>
            <Typography variant='h1'>The Biergarten Index</Typography>
            <Typography variant='h2' gutterBottom sx={{ mb: '1em' }}>
              Beers
            </Typography>
          </Grid>
          {!currentUser && (
            <Grid md={2} sm={12} item>
              <Button
                startIcon={<AddCircleOutlinedIcon />}
                onClick={() => navigate('/beers/create')}
                variant='contained'
                sx={{ width: '100%' }}
              >
                Post a new beer
              </Button>
            </Grid>
          )}
        </Grid>

        <BeerList />
      </Container>
    </Box>
  );
};

export default Beers;
