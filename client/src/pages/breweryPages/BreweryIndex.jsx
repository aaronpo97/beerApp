import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Container, Box, Typography, Button, IconButton, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

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
      <Container sx={{ mt: 8 }} maxWidth={'lg'}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box>
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
          </Box>
          {currentUser.isAccountConfirmed && (
            <Box>
              <Tooltip title='Post a new brewery' onClick={() => navigate('/breweries/create')}>
                <IconButton>
                  <AddIcon />
                </IconButton>
              </Tooltip>
            </Box>
          )}
        </Box>

        <BreweryList breweries={breweries} />
      </Container>
    </Box>
  );
};
export default BreweryIndex;
