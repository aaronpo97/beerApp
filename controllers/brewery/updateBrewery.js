import Brewery from '../../database/models/Brewery.js';
import ServerError from '../../utilities/errors/ServerError.js';
import SuccessResponse from '../../utilities/response/SuccessResponse.js';

const updateBrewery = async (req, res, next) => {
  try {
    const { id } = req.params;
    const brewery = await Brewery.findById(id);

    if (!brewery)
      throw new ServerError(
        `Cannot update the brewery with the id of ${id} as it could not be found.`,
        404,
      );

    await brewery.updateOne(req.body);
    await brewery.save();
    const updatedBrewery = await Brewery.findById(id);

    const status = 200;
    res.json(
      new SuccessResponse(
        `Updated brewery '${id}'`,
        status,
        updatedBrewery,
        req.didTokenRegenerate ? req.accessToken : undefined,
      ),
    );
  } catch (error) {
    next(error);
  }
};

export default updateBrewery;
