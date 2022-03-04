import { Request, Response, NextFunction } from 'express';

import ServerError from '../../utilities/errors/ServerError';
import Brewery from '../../database/models/Brewery';

import SuccessResponse from '../../utilities/response/SuccessResponse';

const viewBrewery = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const brewery = await Brewery.findById(id)
      .populate('postedBy', 'username')
      .populate('beers')
      .populate({
        path: 'beers',
        populate: {
          path: 'images',
          model: 'Image',
        },
      })
      .populate('images', 'url');

    const status = 200;

    next(
      new SuccessResponse(
        `Viewing brewery: '${brewery.name}'`,
        status,
        brewery,
        req.didTokenRegenerate ? req.accessToken : undefined,
      ),
    );
  } catch (error) {
    const { id } = req.params;
    if (error.name === 'CastError') {
      next(new ServerError(`Cannot find a brewery with an id of ${id}.`, 404));
      return;
    }
    next(error);
  }
};

export default viewBrewery;
