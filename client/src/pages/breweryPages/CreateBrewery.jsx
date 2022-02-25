import { useState } from 'react';
import { Box, Container, IconButton, LinearProgress, Tooltip, Typography } from '@mui/material';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import CreateBreweryForm from '../../components/brewery_components/CreateBreweryForm';

const CreateBrewery = () => {
  const navigate = useNavigate();
  const [isNewBreweryLoading, setIsNewBreweryLoading] = useState(false);
  return (
    <Container
      sx={
        isNewBreweryLoading
          ? {
              display: 'flex',
              alignItems: 'center',
              mt: `${100 / 3}vh`,
              flexDirection: 'column',
            }
          : { mt: 8 }
      }
    >
      {isNewBreweryLoading ? (
        <Box>
          <Typography variant='h3' component='h1' sx={{ mb: 2 }}>
            Uploading images and creating new post...
          </Typography>

          <LinearProgress sx={{ width: '100%' }} />
        </Box>
      ) : (
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box>
              <Typography variant='h1'>The Biergarten Index</Typography>
              <Typography variant='h2' gutterBottom sx={{ mb: '1em' }}>
                Breweries
              </Typography>
            </Box>
            <Box>
              <Tooltip title='Go back' onClick={() => navigate('/breweries')}>
                <IconButton>
                  <ArrowBackIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
          <CreateBreweryForm setIsNewBreweryLoading={setIsNewBreweryLoading} />
        </Box>
      )}
    </Container>
  );
};
export default CreateBrewery;
