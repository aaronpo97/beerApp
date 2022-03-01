import { Document } from 'mongoose';
import { Request, Response, NextFunction } from 'express';

import BeerPost from '../../database/models/BeerPost';
import User from '../../database/models/User';

import ServerError from '../../utilities/errors/ServerError';

declare global {
  namespace Express {
    interface Request {
      post: Document<typeof BeerPost>;
    }
  }
}

const isPostOwner = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const post = await BeerPost.findById(id);
    if (!post) {
      throw new ServerError('Cannot find a post with that id.', 404);
    }
    const author = await User.findById(post.postedBy.toString());
    if (!author) {
      throw new ServerError(
        'Post has no author, and therefore no one is authorized to edit or delete it.',
        403,
      );
    }
    // eslint-disable-next-line no-underscore-dangle
    if (req.currentUser._id.toString() !== author._id.toString()) {
      throw new ServerError('You are not authorized to do that.', 403);
    }
    req.post = post;
    next();
  } catch (error) {
    if (error.name === 'CastError') {
      next(new ServerError('Invalid post id.', 400));
    }
    next(error);
  }
};

export default isPostOwner;
