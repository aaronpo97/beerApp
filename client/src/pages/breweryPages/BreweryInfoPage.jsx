import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { Container, Box, LinearProgress } from '@mui/material';

import BreweryInfo from '../../components/brewery_components/BreweryInfo';

import ImageCarousel from '../../components/utilities/ImageCarousel';
const BreweryInfoPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [breweryData, setBreweryData] = useState(null);

  useEffect(() => {
    const getBreweryData = async () => {
      try {
        const url = `/api/breweries/${id}`;
        const headers = {
          'x-access-token': localStorage['access-token'],
          'x-auth-token': localStorage['refresh-token'],
        };
        const response = await fetch(url, { headers });
        const data = await response.json();
        if (response.status === 403) {
          navigate('/confirmaccount');
        }

        setBreweryData(data.payload);
      } catch (error) {
        console.error(error);
      }
    };
    getBreweryData();
  }, [id, navigate]);

  return !breweryData ? (
    <LinearProgress sx={{ mt: 2 }} />
  ) : (
    <Box>
      <ImageCarousel images={breweryData.images} imageHeight='60vh' />
      <Container maxWidth={'lg'}>
        <BreweryInfo breweryData={breweryData} />
      </Container>
    </Box>
  );
};

export default BreweryInfoPage;
