import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Container, Box, Grid, Typography, Button } from '@mui/material';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';

import BreweryList from '../../components/brewery_components/BreweryList';

import { AuthContext } from '../../util/AuthContext';

const BreweryIndex = () => {
  const [breweries, setBreweries] = useState([]);
  const [sortingParam] = useState('default');
  const [sortingDirection] = useState('default');

  const navigate = useNavigate();

  const [currentUser, dispatch] = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      const requestOptions = {
        method: 'GET',
        headers: {
          'x-access-token': localStorage['access-token'],
          'x-auth-token': localStorage['refresh-token'],
        },
      };
      const url = `/api/breweries?sort=${sortingDirection}&param=${sortingParam}`;
      const response = await fetch(url, requestOptions);
      if (response.status === 401) {
        dispatch({
          type: 'UPDATE_CURRENT_USER',
          payload: {},
        });
        localStorage.clear();
        navigate('/login');
      }
      if (response.status === 403) {
        // setShowConfirmationError;
      }
      const result = await response.json();
      if (!result.payload) return;
      localStorage['access-token'] = result.payload.newAccessToken || localStorage['access-token'];
      setBreweries(result.payload || []);
    };
    fetchData();
  }, [sortingParam, sortingDirection, navigate, dispatch]);
  return (
    <Box>
      <Container sx={{ mt: '5em' }} maxWidth={'lg'}>
        <Grid container>
          <Grid item md={9} sm={12}>
            <Typography variant='h1'>The Biergarten Index</Typography>
            <Typography
              variant='h2'
              gutterBottom
              sx={{
                mb: '1em',
              }}
            >
              Breweries
            </Typography>
          </Grid>
          {currentUser.isAccountConfirmed && (
            <Grid md={3} sm={12} item>
              <Button
                startIcon={<AddCircleOutlinedIcon />}
                onClick={() => navigate('/breweries/create')}
                variant='contained'
                sx={{
                  width: '100%',
                }}
              >
                Post a new brewery
              </Button>
            </Grid>
          )}
        </Grid>

        <BreweryList breweries={breweries} />
      </Container>
    </Box>
  );
};
export default BreweryIndex;
