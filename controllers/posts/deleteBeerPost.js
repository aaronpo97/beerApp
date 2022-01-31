import BeerPost from '../../database/models/BeerPost.js';
import ServerError from '../../utilities/errors/ServerError.js';
import deletePost from '../../utilities/deletion/deletePost.js';
import SuccessResponse from '../../utilities/response/SuccessResponse.js';

const deleteBeerPost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await BeerPost.findById(id);
    if (!post)
      throw new ServerError(
        `Cannot delete a post with the id: ${id} as it could not be found.`,
        404,
      );
    await deletePost(post);
    const status = 200;
    const message = `Deleted a post with the id ${id}.`;
    const payload = { post, deleted: true };
    res
      .json(
        new SuccessResponse(
          message,
          status,
          payload,
          req.didTokenRegenerate ? req.accessToken : undefined,
        ),
      )
      .status(status);
  } catch (error) {
    if (error.type === 'CastError') {
      next(new ServerError('Cannot delete that post as the id is invalid', 400));
    }
    next(error);
  }
};

export default deleteBeerPost;
