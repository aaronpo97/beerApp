import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Box, Container, Grid } from '@mui/material';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import ms from 'ms';
import { useContext } from 'react';
import { UserContext } from '../util/UserContext';
import AccountNotConfirmedDialog from '../components/confirmAccount_components/AccountNotConfirmedDialog';

const ProfileHeader = ({ user }) => {
  return (
    user && (
      <Card elevation={5} sx={{ mb: 2 }}>
        <Grid container>
          <Grid item md={2}>
            <CardMedia
              component='img'
              alt={user.username}
              image={
                user.displayImage?.url ||
                'https://c.tenor.com/h99LQHUExJIAAAAd/19dollar-fortnite-card-among-us.gif'
              }
              sx={{ maxWidth: 'auto', height: '100%' }}
            />
          </Grid>

          <Grid item md={10}>
            <CardContent
              sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
            >
              <Box>
                <Typography variant='h1' component='div'>
                  {user.firstName} {user.lastName}
                </Typography>
                <Typography variant='h2' component='div' gutterBottom>
                  {user.username}
                </Typography>
                <Typography gutterBottom variant='h3' component='div'>
                  member for {ms(Date.now() - new Date(user.createdAt), { long: true })}
                </Typography>
              </Box>

              <Typography variant='body2'>{user.posts.length} beer posts</Typography>
              <Typography variant='body2'>
                {user.likes.length} like{user.likes.length !== 1 ? 's' : ''}
              </Typography>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    )
  );
};

const ProfileBio = ({ user }) => {
  return (
    user && (
      <Card elevation={5}>
        <CardContent>
          <Typography variant='h2' gutterBottom>
            About
          </Typography>
          {user.bio}
        </CardContent>
      </Card>
    )
  );
};
const ProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const requestOptions = {
        method: 'GET',
        headers: {
          'x-access-token': localStorage['access-token'],
          'x-auth-token': localStorage['refresh-token'],
        },
      };
      const url = `/api/users/profile/${id}`;
      const response = await fetch(url, requestOptions);
      if (response.status === 404) return;
      if (response.status === 401) {
        localStorage.clear();
        navigate('/login');
      }
      const result = await response.json();
      if (!result.payload) return;
      localStorage['access-token'] = result.payload.newAccessToken || localStorage['access-token'];

      setUser(result.payload);
    };
    fetchData();
  }, [id, navigate]);

  const [currentUser] = useContext(UserContext);
  return (
    <Box sx={{ mt: 5 }}>
      <Container maxWidth='lg'>
        {currentUser?.isAccountConfirmed ? (
          <Box>
            <ProfileHeader user={user} />

            <Grid container spacing={2}>
              <Grid item md={4}>
                {user && (
                  <Card>
                    <CardContent>
                      <Typography variant='h3'>Posts</Typography>
                    </CardContent>
                  </Card>
                )}
              </Grid>
              <Grid item md={8}>
                <ProfileBio user={user} />
              </Grid>
            </Grid>
          </Box>
        ) : (
          <AccountNotConfirmedDialog />
        )}
      </Container>
    </Box>
  );
};

export default ProfilePage;
