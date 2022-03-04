import { NextFunction, Request, Response } from 'express';
import { Types } from 'mongoose';

import BeerPost from '../../database/models/BeerPost';
import Brewery from '../../database/models/Brewery';

import SuccessResponse from '../../utilities/response/SuccessResponse';
import ServerError from '../../utilities/errors/ServerError';

declare global {
  namespace Express {
    interface Request {
      newAccessToken?: string;
      didTokenRegenerate?: boolean;
    }
  }
}

interface CreateBeerInterface {
  abv?: number;
  brewery: string;
  description: string;
  ibu?: number;
  images: Types.ObjectId[];
  name: string;
  type: string;
}

const createBeerPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { abv, description, ibu, images, name, type, brewery: breweryId }: CreateBeerInterface = req.body;

    const brewery = await Brewery.findById(breweryId);
    if (!brewery) throw new ServerError('Cannot find a brewery with that id.', 404);

    const beerData = { name, type, description, brewery, images, abv, ibu, postedBy: req.currentUser };

    // create the post
    const post = new BeerPost(beerData);
    await post.save();

    brewery.beers.push(post);
    await brewery.save();

    // @ts-ignore
    req.currentUser.posts.push(post);
    await req.currentUser.save();

    const status = 201;
    const createdPost = await BeerPost.findById(post._id)
      .populate('postedBy', 'username')
      .populate('images', 'url filename')
      .populate('brewery', 'name');

    next(
      new SuccessResponse(
        `Post ${createdPost.name} created.`,
        status,
        createdPost,
        req.didTokenRegenerate ? req.newAccessToken : undefined,
      ),
    );
  } catch (error) {
    switch (error.name) {
      case 'ValidationError':
        next(new ServerError(`Mongoose validation error. ${error.message}`, 401));
        break;
      case 'CastError':
        next(new ServerError(`Cannot create beer post. ${error.message}`, 401));
        break;
      default:
        next(error);
        break;
    }
  }
};

export default createBeerPost;
