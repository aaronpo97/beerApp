import { Button } from '@mui/material';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { useState, useEffect, useContext } from 'react';

import { UserContext } from '../../util/UserContext';

const LikeButton = ({ beer }) => {
   const [liked, setLiked] = useState(null);
   const user = useContext(UserContext);

   useEffect(() => {
      setLiked(beer.likedBy.includes(user));
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

         const response = await fetch(`http://localhost:5000/api/beers/${beer._id}/like`, requestOptions);
         const data = await response.json();

         if (data.newAccessToken) {
            localStorage['access-token'] = data.newAccessToken;
         }
         return data;
      };

      sendLikeRequest()
         .then(() => setLiked(!liked))
         .error(error => console.error('Something went wrong: ' + error));
   };
   return (
      <Button
         variant='outlined'
         onClick={onLikeClick}
         startIcon={liked ? <ThumbUpIcon /> : <ThumbUpAltOutlinedIcon />}
      >
         Like
      </Button>
   );
};

export default LikeButton;
