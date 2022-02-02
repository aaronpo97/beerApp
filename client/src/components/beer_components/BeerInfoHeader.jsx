import { useNavigate } from 'react-router-dom';
import { Grid, Box, Link, Typography, Button } from '@mui/material';
import { useContext } from 'react';
import { AuthContext } from '../../util/AuthContext';

const BeerInfoHeader = ({ currentBeer }) => {
  const navigate = useNavigate();
  const [currentUser] = useContext(AuthContext);

  return (
    <Grid container>
      <Grid md={10} item>
        <Typography variant='h1'>{currentBeer.name}</Typography>
        <Typography variant='h2' sx={{ mb: 1 }}>
          <Link underline='hover' onClick={() => navigate(`/breweries/${currentBeer.brewery._id}`)}>
            {currentBeer.brewery.name}
          </Link>
        </Typography>{' '}
      </Grid>
      <Grid md={2} item>
        {currentUser?._id === currentBeer.postedBy._id && (
          <Button
            variant={'contained'}
            onClick={() => navigate(`/beers/${currentBeer._id}/edit`)}
            sx={{ mt: 1 }}
            fullWidth
          >
            Edit
          </Button>
        )}
      </Grid>
    </Grid>
  );
};

export default BeerInfoHeader;
