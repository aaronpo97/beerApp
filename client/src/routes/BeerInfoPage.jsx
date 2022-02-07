import { useParams, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';

import { Container, Box, Grid, LinearProgress } from '@mui/material';

import BeerInfoHeader from '../components/beer_components/BeerInfoHeader';
import ImageCarousel from '../components/utilities/ImageCarousel';
import BeerAbout from '../components/beer_components/BeerAbout';

import CommentCard from '../components/comment_components/CommentCard';
import CommentCreateForm from '../components/comment_components/CommentCreateForm';

const InfoPage = () => {
  const navigate = useNavigate();
  const { id: beerID } = useParams();
  const [currentBeer, setCurrentBeer] = useState(null);

  //fetch beer data
  useEffect(() => {
    const getBeerData = async () => {
      try {
        const url = `/api/beers/${beerID}`;
        const headers = {
          'x-access-token': localStorage['access-token'],
          'x-auth-token': localStorage['refresh-token'],
        };
        const response = await fetch(url, { headers });
        if (response.status === 401) {
          localStorage.clear();
          navigate('/login');
        }
        if (response.status === 403) {
          navigate('/confirmaccount');
        }

        const data = await response.json();

        setCurrentBeer(data.payload);
      } catch (error) {
        console.error(error);
      }
    };
    getBeerData();
  }, [beerID, navigate]);

  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (!currentBeer) return;
    setComments(currentBeer.comments);
  }, [currentBeer]);

  console.log(currentBeer);
  return currentBeer ? (
    <>
      <ImageCarousel images={currentBeer.images} imageHeight='600px' />
      <Container maxWidth='lg'>
        <Box sx={{ mt: '3em' }}>
          <BeerInfoHeader currentBeer={currentBeer} />
          <Grid container spacing={2} component='main' sx={{ mt: 2 }}>
            <Grid md={12} item>
              <BeerAbout currentBeer={currentBeer} />
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ mt: 3 }}>
          <Grid container spacing={3}>
            <Grid item md={4.5}>
              <CommentCreateForm
                currentBeer={currentBeer}
                comments={comments}
                setComments={setComments}
              />
            </Grid>
            <Grid item md={7.5}>
              {comments.map((comment) => (
                <CommentCard
                  key={comment._id}
                  comment={comment}
                  setComments={setComments}
                  comments={comments}
                />
              ))}
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  ) : (
    <LinearProgress />
  );
};

export default InfoPage;
