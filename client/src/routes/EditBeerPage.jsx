import { useNavigate, useParams } from 'react-router-dom';
import { Container, Box, Typography, Button, Grid } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import EditBeerForm from '../components/beer_components/EditBeerForm';

const EditBeer = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <Box>
      <Container sx={{ marginTop: 4 }}>
        <Grid container sx={{ mt: 5 }}>
          <Grid item md={10} sm={12}>
            <Typography variant='h1'>The Biergarten Index</Typography>
            <Typography variant='h2' gutterBottom sx={{ mb: '1em' }}>
              Edit
            </Typography>
          </Grid>
          <Grid md={2} sm={12} item>
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate(`/beers/${id}`)}
              variant='contained'
              sx={{ width: '100%' }}
            >
              Discard edits
            </Button>
          </Grid>
        </Grid>
        <EditBeerForm id={id} />
      </Container>
    </Box>
  );
};
export default EditBeer;
