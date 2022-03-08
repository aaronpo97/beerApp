import { useNavigate, useParams } from 'react-router-dom';
import { Container, Box, Typography, Tooltip, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import EditBeerForm from '../../components/beer_components/EditBeerForm';

const EditBeer = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <Box>
      <Container sx={{ mt: 8, mb: 8 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant='h1'>The Biergarten Index</Typography>
            <Typography variant='h2' gutterBottom sx={{ mb: '1em' }}>
              Edit
            </Typography>
          </Box>
          <Box>
            <Tooltip title='Discard edits' onClick={() => navigate(`/beers/${id}`)}>
              <IconButton>
                <ArrowBackIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
        <EditBeerForm id={id} />
      </Container>
    </Box>
  );
};
export default EditBeer;
