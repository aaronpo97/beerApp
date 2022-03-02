/* eslint-disable camelcase */
import ServerError from '../../utilities/errors/ServerError';
import { Request, Response, NextFunction } from 'express';

import { SuccessResponse } from '../../utilities/response/SuccessResponse';
import geocode from '../../utilities/mapbox/geocode';

import Brewery from '../../database/models/Brewery';

const createBrewery = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, description, address, images = [] } = req.body;

    if (!(name && description && address)) {
      throw new ServerError('Name, description and address must be provided.', 401);
    }

    const geoData = await geocode(address);

    const { place_name = '', geometry = {} } = geoData;

    const breweryData = {
      name,
      description,
      images,
      location: { place_name, geometry },
      postedBy: req.currentUser,
      beers: [],
    };
    const newBrewery = new Brewery(breweryData);
    await newBrewery.save();

    const payload = newBrewery;
    const status = 201;
    next(
      new SuccessResponse(
        `Successfully created brewery: ${breweryData.name}`,
        status,
        payload,
        req.didTokenRegenerate ? req.accessToken : undefined,
      ),
    );
  } catch (error) {
    if (error.name === 'ValidationError') {
      next(new ServerError(`Mongoose validation error. ${error.message}`, 401));
    } else {
      next(error);
    }
  }
};
export default createBrewery;
