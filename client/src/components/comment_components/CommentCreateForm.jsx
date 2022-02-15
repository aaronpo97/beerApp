import { useState } from 'react';
import { Box, FormControl, TextField, Button, Rating, Typography, Card, CardContent } from '@mui/material';
import FormErrorAlert from '../utilities/FormErrorAlert';

const CommentCreateForm = ({ currentBeer, setCommentsPageNum, newComments, setNewComments }) => {
  const [commentBody, setCommentBody] = useState('');
  const [commentRating, setCommentRating] = useState(0);

  const [formErrors, setFormErrors] = useState({});
  const handleSubmit = (e) => {
    e.preventDefault();

    const validateData = async () => {
      const errors = {};
      if (!commentBody) {
        errors.commentBody = 'You cannot send an empty comment.';
      }
      if (!commentRating) {
        errors.commentRating = 'Rating must be greater than 0.';
      }

      if (Object.keys(errors).length) {
        setFormErrors(errors);
        throw new Error('Form validation failed.');
      }

      return;
    };

    const submitComment = async () => {
      const requestOptions = {
        method: 'POST',
        headers: {
          'x-access-token': localStorage['access-token'],
          'x-auth-token': localStorage['refresh-token'],
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ commentBody, commentRating }),
      };
      const response = await fetch(`/api/beers/${currentBeer._id}/comments`, requestOptions);

      if (response.status !== 201) {
        throw new Error('Comment did not submit.');
      }
      const data = await response.json();
      setCommentsPageNum(1);
      setNewComments([...newComments, data.payload]);
    };

    validateData()
      .then(() => submitComment())
      .then(() => {
        setCommentBody('');
        setFormErrors({});
        setCommentRating(0);
      })
      .catch((error) => console.error(error));
  };
  return (
    <Box sx={{ mb: 2 }} component='form' onSubmit={handleSubmit} noValidate>
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant='h3'>Comments</Typography>
        </CardContent>
      </Card>
      <FormControl sx={{ width: '100%' }}>
        <TextField
          id='outlined-basic'
          label='Leave a comment'
          multiline
          minRows={9}
          onChange={(e) => setCommentBody(e.target.value)}
          value={commentBody}
          variant='outlined'
          sx={{ mb: 0 }}
          error={!!formErrors.commentBody}
        />
        {formErrors.commentBody && <FormErrorAlert error={formErrors.commentBody} />}{' '}
        <Box sx={{ mt: 2 }}>
          <Rating onChange={(e) => setCommentRating(parseInt(e.target.value))} value={commentRating} />
        </Box>
        {formErrors.commentRating && <FormErrorAlert error={formErrors.commentRating} />}
        <Button sx={{ mt: 1 }} variant='contained' type='submit'>
          Submit
        </Button>
      </FormControl>
    </Box>
  );
};

export default CommentCreateForm;
