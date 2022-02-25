import { useContext } from 'react';

import { LinearProgress, Typography, Box, Link, Grid, Button, Tooltip, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import BeerCard from '../beer_components/BeerCard';

import { Masonry } from '@mui/lab';
import { AuthContext } from '../../util/AuthContext';

const BreweryInfo = ({ breweryData }) => {
  const [currentUser] = useContext(AuthContext);

  const navigate = useNavigate();

  return !breweryData ? (
    <LinearProgress />
  ) : (
    <Box>
      <Box sx={{ mt: 5 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant='h1'>{breweryData.name}</Typography>
            <Typography gutterBottom variant='h2' sx={{ fontStyle: 'normal' }} component='address'>
              {breweryData.location.place_name}
            </Typography>
          </Box>
          <Box>
            {currentUser._id === breweryData.postedBy._id && (
              <Tooltip
                onClick={() => navigate(`/breweries/${breweryData._id}/edit`)}
                title={`Edit '${breweryData.name}'`}
              >
                <IconButton>
                  <EditIcon />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        </Box>
      </Box>
      <Box sx={{ mt: '2em' }}>
        <Typography gutterBottom variant='h3' component='p'>
          Submitted by:{' '}
          <Link underline='hover' onClick={() => navigate(`/profile/${breweryData.postedBy._id}`)}>
            {breweryData.postedBy.username}
          </Link>
        </Typography>
      </Box>
      <Box sx={{ mt: '1em', mb: '2em' }}>
        <Typography gutterBottom variant='h3'>
          About
        </Typography>
        <Typography variant='body1' color='text.secondary'>
          {breweryData.description}
        </Typography>
      </Box>
      <Typography gutterBottom variant='h3'>
        Beers
      </Typography>

      <Masonry columns={{ xs: 1, sm: 1, md: 2, lg: 3, xl: 3 }} spacing={2} sx={{ mb: 0 }}>
        {breweryData.beers.map((beer) => {
          return <BeerCard key={beer._id} beer={beer} size={'small'} />;
        })}
      </Masonry>
    </Box>
  );
};

export default BreweryInfo;
