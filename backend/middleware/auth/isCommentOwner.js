import Comment from '../../database/models/Comment.js';
import ServerError from '../../utilities/errors/ServerError.js';

const isCommentOwner = async (req, res, next) => {
   try {
      const { currentUser } = req;
      const { commentId } = req.params;

      const comment = await Comment.findById(commentId);
      if (!comment) throw new ServerError('Cannot find that comment.', 404);

      req.resource = comment;

      if (comment.author.toString() !== currentUser._id.toString()) {
         throw new ServerError('You are not authorized to do that.', 403);
      }

      next();
   } catch (error) {
      next(error);
   }
};

export default isCommentOwner;
