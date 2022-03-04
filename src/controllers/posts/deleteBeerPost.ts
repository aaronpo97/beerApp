import { Request, Response, NextFunction } from 'express';
import BeerPost from '../../database/models/BeerPost';
import ServerError from '../../utilities/errors/ServerError';
import deletePost from '../../utilities/deletion/deletePost';
import SuccessResponse from '../../utilities/response/SuccessResponse';

const deleteBeerPost = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;

    const post = await BeerPost.findById(id);
    if (!post) {
      throw new ServerError(`Cannot delete a post with the id: ${id} as it could not be found.`, 404);
    }
    await deletePost(post);

    const status = 200;
    const message = `Deleted a post with the id ${id}.`;
    const payload: { post: typeof post; deleted: true } = { post, deleted: true };
    next(new SuccessResponse(message, status, payload, req.didTokenRegenerate ? req.accessToken : undefined));
  } catch (error) {
    if (error.type === 'CastError') {
      next(new ServerError('Cannot delete that post as the id is invalid', 400));
    }
    next(error);
  }
};

export default deleteBeerPost;
