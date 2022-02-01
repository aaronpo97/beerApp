import { Button } from '@mui/material';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { useState, useEffect, useContext } from 'react';

import { AuthContext } from '../../util/AuthContext';

const LikeButton = ({ beer }) => {
  const [liked, setLiked] = useState(null);
  const [currentUser] = useContext(AuthContext);

  useEffect(() => {
    if (!currentUser) return;
    setLiked(beer.likedBy.includes(currentUser._id));
  }, [beer.likedBy, currentUser]);

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

      if (data.newAccessToken) {
        localStorage['access-token'] = data.newAccessToken;
      }
      return data;
    };

    setLiked(!liked);
    sendLikeRequest().catch((error) => console.error(`Something went wrong: ${error}`));
  };
  return (
    currentUser && (
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
