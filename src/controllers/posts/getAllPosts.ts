import { Request, Response, NextFunction } from 'express';
import BeerPost from '../../database/models/BeerPost.js';
import sort from '../../utilities/data/sorter.js';
import { SuccessResponse } from '../../utilities/response/SuccessResponse';

const getAllPosts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { query } = req;
    const allPosts = await BeerPost.find()
      .populate('brewery', 'name')
      .populate('images', 'url')
      .populate('postedBy', 'username');

    const status = 200;
    const payload = sort(allPosts, query.sort, query.param);
    const message = `Sending beer index.${
      req.query.sort && req.query.param ? ` Sorting by ${req.query.param} in ${req.query.sort} order.` : ''
    }`;
    // @ts-ignore - todo work on appending the request object to include this
    next(new SuccessResponse(message, status, payload, req.didTokenRegenerate ? req.accessToken : undefined));
  } catch (error) {
    next(error);
  }
};

export default getAllPosts;
