import { Request, Response, NextFunction } from 'express';

import ServerError from '../../utilities/errors/ServerError';
import BeerPost from '../../database/models/BeerPost';
import Image from '../../database/models/Image';
import deletePost from '../../utilities/deletion/deletePost';
import deleteImage from '../../utilities/deletion/deleteImage';
import SuccessResponse from '../../utilities/response/SuccessResponse';
import Comment from '../../database/models/Comment';
import deleteComment from '../../utilities/deletion/deleteComment';

const deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.currentUser) throw new ServerError('Cannot delete user.', 412);

    const beerPosts = await BeerPost.find({ author: req.currentUser });
    const images = await Image.find({ uploadedBy: req.currentUser });
    const comments = await Comment.find({ author: req.currentUser });

    if (beerPosts.length) {
      beerPosts.forEach((post) => deletePost(post));
    }
    if (images.length) {
      images.forEach((image) => deleteImage(image));
    }

    if (comments.length) {
      comments.forEach((comment) => deleteComment(comment));
    }
    await req.currentUser.delete();

    const status = 200;

    next(
      new SuccessResponse(
        'Successfully deleted user.',
        status,
        undefined,
        req.didTokenRegenerate ? req.accessToken : undefined,
      ),
    );
  } catch (error) {
    next(error);
  }
};
export default deleteUser;
