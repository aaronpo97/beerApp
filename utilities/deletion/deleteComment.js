import BeerPost from '../../database/models/BeerPost.js';
import Comment from '../../database/models/Comment.js';
import User from '../../database/models/User.js';

const deleteComment = async (commentId) => {
  try {
    const comment = await Comment.findById(commentId.toString());
    await BeerPost.findByIdAndUpdate(comment.post.toString(), { $pull: { comments: comment._id } });
    await User.findByIdAndUpdate(comment.author.toString(), { $pull: { comments: comment._id } });
    return await comment.delete();
  } catch (error) {
    return Promise.reject(error);
  }
};

export default deleteComment;
