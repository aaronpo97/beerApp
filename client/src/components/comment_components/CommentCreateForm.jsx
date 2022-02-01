import { useState, useContext } from 'react';
import { Box, FormControl, TextField, Button } from '@mui/material';
import { AuthContext } from '../../util/AuthContext';
import FormErrorAlert from '../utilities/FormErrorAlert';

const CommentCreateForm = ({ currentBeer, comments, setComments }) => {
  const [comment, setComment] = useState('');

  const currentUser = useContext(AuthContext);

  const [formErrors, setFormErrors] = useState({});
  const handleSubmit = (e) => {
    e.preventDefault();

    const validateData = async () => {
      const errors = {};
      if (!comment) {
        errors.comment = 'You cannot send an empty comment.';
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
        body: JSON.stringify({ comment }),
      };
      const response = await fetch(`/api/beers/${currentBeer._id}/comments`, requestOptions);
      const data = await response.json();
      console.log(data.payload);
      if (response.status !== 201) {
        throw new Error('Comment did not submit.');
      }
      console.log('changed');
      setComments([data.payload, ...comments]);
    };

    validateData()
      .then(() => submitComment())
      .then(() => {
        setComment('');
        setFormErrors({});
      })
      .catch((error) => console.error(error));
  };
  return (
    <Box sx={{ mb: 2 }} component='form' onSubmit={handleSubmit} noValidate>
      <FormControl sx={{ width: '100%' }}>
        <TextField
          id='outlined-basic'
          label='Leave a comment'
          multiline
          minRows={9}
          onChange={(e) => setComment(e.target.value)}
          value={comment}
          variant='outlined'
          sx={{ mb: 0 }}
          error={!!formErrors.comment}
        />
        {formErrors.comment && <FormErrorAlert>{formErrors.comment}</FormErrorAlert>}
        <Button sx={{ mt: 1 }} variant='contained' type='submit'>
          Submit
        </Button>
      </FormControl>
    </Box>
  );
};

export default CommentCreateForm;
