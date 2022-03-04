import { Document } from 'mongoose';
import BeerPost from '../../database/models/BeerPost';
import Comment from '../../database/models/Comment';
import User from '../../database/models/User';

const deleteComment = async (commentId) => {
  const comment = await Comment.findById(commentId.toString());
  await BeerPost.findByIdAndUpdate(comment.post.toString(), { $pull: { comments: comment._id } });
  // @ts-expect-error
  await User.findByIdAndUpdate(comment.author.toString(), { $pull: { comments: comment._id } });
  return await comment.delete();
};

export default deleteComment;
