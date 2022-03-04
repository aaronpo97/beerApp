import Comment from '../../database/models/Comment';
import ServerError from '../../utilities/errors/ServerError';
import SuccessResponse from '../../utilities/response/SuccessResponse';

import { Request, Response, NextFunction } from 'express';

const viewComment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { commentId } = req.params;

    const comment = await Comment.findById(commentId)
      .populate('post', 'name brewery')
      .populate('author', 'username');
    if (!comment) throw new ServerError('Cannot find that comment', 404);

    const payload = { comment };

    next(
      new SuccessResponse(
        'Viewing comment',
        200,
        payload,
        req.newAccessToken ? req.newAccessToken : undefined,
      ),
    );
  } catch (error) {
    if (error.name === 'CastError') {
      next(
        new ServerError(
          `Cannot locate resource as the provided comment and / or beerpost id is invalid.`,
          404,
        ),
      );
    }
    next(error);
  }
};

export default viewComment;
