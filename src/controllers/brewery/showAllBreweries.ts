import { NextFunction, Request, Response } from 'express';
import Brewery from '../../database/models/Brewery';
import sort from '../../utilities/data/sorter';

import SuccessResponse from '../../utilities/response/SuccessResponse';

const showAllBreweries = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const allBreweries = await Brewery.find()
      .populate('beers')
      .populate('postedBy', 'username')
      .populate('images', 'url');

    const message = `Sending brewery index.${
      req.query.sort && req.query.param ? ` Sorting by ${req.query.param} in ${req.query.sort} order.` : ''
    }`;
    const status = 200;
    const payload = sort(
      allBreweries,
      req.query.sort as 'ascending' | 'descending',
      req.query.param as string,
    );
    next(new SuccessResponse(message, status, payload, req.didTokenRegenerate ? req.accessToken : undefined));
  } catch (error) {
    next(error);
  }
};

export default showAllBreweries;
