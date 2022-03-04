import Comment from '../../database/models/Comment';
import deleteCommentUtil from '../../utilities/deletion/deleteComment';
import { NextFunction, Request, Response } from 'express';
import SuccessResponse from '../../utilities/response/SuccessResponse';

const deleteComment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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
