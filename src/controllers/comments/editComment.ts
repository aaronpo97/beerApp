import { Request, Response, NextFunction } from 'express';
import Comment from '../../database/models/Comment.js';
import { SuccessResponse } from '../../utilities/response/SuccessResponse.js';

const editComment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { commentId } = req.params;
    const { body } = req.body;

    await Comment.updateOne({ _id: commentId }, { body });
    const updatedComment = await Comment.findById(commentId);

    next(
      new SuccessResponse(
        'Comment updated.',
        200,
        updatedComment,
        req.newAccessToken ? req.newAccessToken : undefined,
      ),
    );
  } catch (error) {
    next(error);
  }
};
export default editComment;
