import Comment from '../../database/models/Comment.js';
import ServerError from '../../utilities/errors/ServerError.js';
import SuccessResponse from '../../utilities/response/SuccessResponse.js';

const viewComment = async (req, res, next) => {
  try {
    const { commentId } = req.params;

    const comment = await Comment.findById(commentId)
      .populate('post', 'name brewery')
      .populate('author', 'username');
    if (!comment) throw new ServerError('Cannot find that comment', 404);

    const payload = { comment };

    res.json(
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
