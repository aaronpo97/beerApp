import Comment from '../../database/models/Comment.js';
import SuccessResponse from '../../utilities/response/SuccessResponse.js';
import deleteCommentUtil from '../../utilities/deletion/deleteComment.js';

const deleteComment = async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const commentToDelete = await Comment.findById(commentId);

    await deleteCommentUtil(commentToDelete._id);
    next(
      new SuccessResponse(
        'Deleted comment.',
        200,
        undefined,
        req.newAccessToken ? req.newAccessToken : undefined,
      ),
    );
  } catch (error) {
    next(error);
  }
};
export default deleteComment;
