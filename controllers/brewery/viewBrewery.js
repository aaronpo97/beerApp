import ServerError from '../../utilities/errors/ServerError.js';
import Brewery from '../../database/models/Brewery.js';

import SuccessResponse from '../../utilities/response/SuccessResponse.js';

const viewBrewery = async (req, res, next) => {
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

    res
      .json(
        new SuccessResponse(
          `Viewing brewery: '${brewery.name}'`,
          status,
          brewery,
          req.didTokenRegenerate ? req.accessToken : undefined,
        ),
      )
      .status(status);
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
