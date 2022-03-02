import Comment from '../../database/models/Comment';
import { SuccessResponse } from '../../utilities/response/SuccessResponse';
import deleteCommentUtil from '../../utilities/deletion/deleteComment';
import { NextFunction, Request, Response } from 'express';

const deleteComment = async (req: Request, res: Response, next: NextFunction) => {
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
