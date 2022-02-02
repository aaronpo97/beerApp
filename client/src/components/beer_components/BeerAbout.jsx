import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../../util/AuthContext';
import { Card, CardContent, Box, Typography, Link, Grid, Button } from '@mui/material';
const BeerAbout = ({ currentBeer }) => {
  const navigate = useNavigate();
  const [user] = useContext(AuthContext);

  return (
    <Card>
      <CardContent>
        <Box sx={{ mb: 1 }}>
          <Typography variant='body2'>{currentBeer.description}</Typography>
        </Box>

        <Box sx={{ mt: 3 }}>
          <Typography variant='body2' sx={{ fontWeight: '500' }} gutterBottom>
            Type: {' ' + currentBeer.type}
          </Typography>
          <Grid container spacing={2}>
            {currentBeer.abv && (
              <Grid md={2} item>
                <Typography variant='body2' sx={{ fontWeight: '500' }}>
                  {currentBeer.abv}% ABV
                </Typography>
              </Grid>
            )}
            {currentBeer.ibu && (
              <Grid md={6} item>
                <Typography variant='body2' sx={{ fontWeight: '500' }}>
                  {currentBeer.ibu} IBU
                </Typography>
              </Grid>
            )}
          </Grid>
        </Box>

        <Box sx={{ mt: 1.5 }}>
          <Typography variant='body2' sx={{ fontWeight: '500' }}>
            posted by:{' '}
            <Link
              underline='hover'
              onClick={() => navigate(`/profile/${currentBeer.postedBy._id}`)}
            >
              {currentBeer.postedBy.username}
            </Link>
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default BeerAbout;
