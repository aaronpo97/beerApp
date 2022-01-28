import { useContext } from 'react';

import { UserContext } from '../../util/UserContext';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Grid, Avatar, Link, Typography, Box, Button } from '@mui/material';

import ms from 'ms';

const CommentCard = ({ comment, comments, setComments }) => {
   const currentUser = useContext(UserContext);

   const navigate = useNavigate();

   const handleCommentEdit = () => {};
   const handleCommentDelete = comment => {
      const sendDeleteRequest = async () => {
         const requestOptions = {
            method: 'DELETE',
            headers: {
               'x-access-token': localStorage['access-token'],
               'x-auth-token': localStorage['refresh-token'],
            },
         };
         console.log(comment);
         const url = `/api/beers/${comment.post._id}/comments/${comment._id}`;
         const response = await fetch(url, requestOptions);
         if (response.status !== 200) throw new Error('Could not delete that comment.');
         return await response.json();
      };

      sendDeleteRequest()
         .then(() => {
            setComments(comments.filter(postedComment => postedComment._id !== comment._id));
         })
         .catch(error => {
            console.error(error);
         });
   };

   return (
      <Card sx={{ mb: 2 }}>
         <CardContent>
            <Grid container spacing={2}>
               <Grid item md={2}>
                  <Avatar />

                  <Link underline='hover' onClick={() => navigate(`/profile/${comment.author._id}`)}>
                     <Typography variant='body2' sx={{ mt: 1 }}>
                        {comment.author.username}
                     </Typography>
                  </Link>
                  <Typography variant='body2'>
                     {ms(Date.now() - new Date(comment.timestamp), { long: true })} ago
                  </Typography>
                  {currentUser?._id === comment.author._id && (
                     <Box>
                        <Button
                           onClick={handleCommentEdit}
                           fullWidth
                           sx={{ paddingLeft: 0, justifyContent: 'flex-start' }}
                        >
                           Edit
                        </Button>
                        <Button
                           onClick={() => handleCommentDelete(comment)}
                           fullWidth
                           sx={{ paddingLeft: 0, justifyContent: 'flex-start' }}
                        >
                           Delete
                        </Button>
                     </Box>
                  )}
               </Grid>
               <Grid item md={10}>
                  {comment.body}
               </Grid>
            </Grid>
         </CardContent>
      </Card>
   );
};

export default CommentCard;
