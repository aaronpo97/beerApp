import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Container, Typography, Tooltip, IconButton } from '@mui/material';

import AddIcon from '@mui/icons-material/Add';

import { AuthContext } from '../../util/AuthContext';
import BeerList from '../../components/beer_components/BeerList';

const Beers = (): JSX.Element => {
  const navigate = useNavigate();

  const [currentUser] = useContext(AuthContext);
  return (
    <Box>
      <Container sx={{ mt: 8 }} maxWidth={'lg'}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant='h1'>The Biergarten Index</Typography>
            <Typography variant='h2' gutterBottom sx={{ mb: '1em' }}>
              Beers
            </Typography>
          </Box>
          {currentUser._id && (
            <Box>
              <Tooltip title='Post a new beer' onClick={() => navigate('/beers/create')}>
                <IconButton>
                  <AddIcon />
                </IconButton>
              </Tooltip>
            </Box>
          )}
        </Box>

        <BeerList />
      </Container>
    </Box>
  );
};

export default Beers;
