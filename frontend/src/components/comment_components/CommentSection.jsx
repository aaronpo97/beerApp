import { Box } from '@mui/material';
import CommentCreateForm from './CommentCreateForm';
import CommentCard from './CommentCard';

const CommentSection = ({ currentBeer, comments, setComments }) => {
   return (
      <Box>
         <CommentCreateForm currentBeer={currentBeer} comments={comments} setComments={setComments} />
         {comments.map(comment => (
            <CommentCard key={comment._id} comment={comment} setComments={setComments} comments={comments} />
         ))}
      </Box>
   );
};

export default CommentSection;
