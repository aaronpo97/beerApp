import { useState } from 'react';
import { Container, Box, Typography, LinearProgress, Tooltip, IconButton } from '@mui/material';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

import CreateBeerForm from '../../components/beer_components/CreateBeerForm';

const CreateBeer = () => {
  const navigate = useNavigate();

  const [isNewBeerLoading, setIsNewBeerLoading] = useState(false);
  return (
    <Box>
      <Container
        sx={
          isNewBeerLoading
            ? { display: 'flex', alignItems: 'center', mt: `${100 / 3}vh`, flexDirection: 'column' }
            : { mt: 8 }
        }
      >
        {isNewBeerLoading ? (
          <>
            <Typography variant='h3' component='h1' sx={{ mb: 2 }}>
              Uploading images and creating new post...
            </Typography>

            <LinearProgress sx={{ width: '100%' }} />
          </>
        ) : (
          <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box>
                <Typography variant='h1'>The Biergarten Index</Typography>
                <Typography variant='h2' gutterBottom>
                  Create Beer Post
                </Typography>
              </Box>

              <Box>
                <Tooltip title='Go back' onClick={() => navigate('/beers')}>
                  <IconButton>
                    <ArrowBackIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
            <CreateBeerForm setIsNewBeerLoading={setIsNewBeerLoading} />
          </>
        )}
      </Container>
    </Box>
  );
};
export default CreateBeer;
