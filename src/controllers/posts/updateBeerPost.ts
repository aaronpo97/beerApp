import ServerError from '../../utilities/errors/ServerError';
import { SuccessResponse } from '../../utilities/response/SuccessResponse';

import BeerPost from '../../database/models/BeerPost';

import { Request, Response, NextFunction } from 'express';
import { Document } from 'mongoose';

declare global {
  namespace Express {
    interface Request {
      post: Document<typeof BeerPost>;
    }
  }
}

interface BeerUpdatesInterface {
  name?: string;
  type?: string;
  description?: string;
  abv?: number;
  ibu?: number;
}
const updateBeerPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { post, body } = req;
    const beerUpdates: BeerUpdatesInterface = body;
    await post.updateOne(beerUpdates);
    await post.save();

    // eslint-disable-next-line no-underscore-dangle
    const updatedBeer = await BeerPost.findById(post._id);

    const status = 200;

    next(
      new SuccessResponse(
        `Updating beer post: ${post._id}`,
        status,
        updatedBeer,
        req.didTokenRegenerate ? req.newAccessToken : undefined,
      ),
    );
  } catch (error) {
    if (error.name === 'CastError') {
      next(new ServerError(`Your update was rejected. ${error.message}`, 409));
    }
    next(error);
  }
};

export default updateBeerPost;
