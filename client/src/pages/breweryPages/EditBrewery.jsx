import { useNavigate, useParams } from 'react-router-dom';

import { Box, Button, Container, Tooltip, IconButton, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import EditBreweryForm from '../../components/brewery_components/EditBreweryForm';

const EditBrewery = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  return (
    <Box>
      <Container sx={{ marginTop: 5 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant='h1'>The Biergarten Index</Typography>
            <Typography variant='h2' gutterBottom sx={{ mb: '1em' }}>
              Breweries
            </Typography>
          </Box>
          <Box>
            <Tooltip title='Go back' onClick={() => navigate(`/breweries/${id}`)}>
              <IconButton>
                <ArrowBackIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
        <EditBreweryForm id={id} />
      </Container>
    </Box>
  );
};
export default EditBrewery;
