import { Button } from '@mui/material';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { useState, useEffect, useContext } from 'react';

import { UserContext } from '../../util/UserContext';

const LikeButton = ({ beer }) => {
  const [liked, setLiked] = useState(null);
  const user = useContext(UserContext);

  useEffect(() => {
    if (!user) return;
    setLiked(beer.likedBy.includes(user._id));
  }, [beer.likedBy, user]);

  const onLikeClick = () => {
    const sendLikeRequest = async () => {
      const requestOptions = {
        method: 'PUT',
        headers: {
          'x-access-token': localStorage['access-token'],
          'x-auth-token': localStorage['refresh-token'],
        },
      };

      const response = await fetch(`/api/beers/${beer._id}/like`, requestOptions);
      const data = await response.json();

      console.log(data);

      if (data.newAccessToken) {
        localStorage['access-token'] = data.newAccessToken;
      }
      return data;
    };

    sendLikeRequest()
      .then(() => setLiked(!liked))
      .catch((error) => console.error(`Something went wrong: ${error}`));
  };
  return (
    user && (
      <Button
        variant='outlined'
        onClick={onLikeClick}
        startIcon={liked ? <ThumbUpIcon /> : <ThumbUpAltOutlinedIcon />}
      >
        {liked ? 'Liked' : 'Like'}
      </Button>
    )
  );
};

export default LikeButton;
