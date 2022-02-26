/* eslint-disable no-unused-vars */
import BeerPost from '../../database/models/BeerPost.js';
import Brewery from '../../database/models/Brewery.js';
import ServerError from '../../utilities/errors/ServerError.js';
import SuccessResponse from '../../utilities/response/SuccessResponse.js';
import Comment from '../../database/models/Comment.js';
import deletePost from '../../utilities/deletion/deletePost.js';

const deleteBrewery = async (req, res, next) => {
  try {
    const { id } = req.params;
    const brewery = await Brewery.findById(id);

    if (!brewery) {
      throw new ServerError('Cannot delete that brewery as it does not exist.', 404);
    }

    if (brewery.beers.length) {
      brewery.beers.forEach(async (beerPostId) => {
        const beerPost = await BeerPost.findById(beerPostId.toString());
        await deletePost(beerPost);
      });
    }

    await brewery.deleteOne();

    const status = 200;
    const payload = { brewery, deleted: true };
    next(
      new SuccessResponse(
        `Successfully deleted brewery '${id}'.`,
        status,
        payload,
        req.didTokenRegenerate ? req.accessToken : undefined,
      ),
    );
  } catch (error) {
    next(error);
  }
};

export default deleteBrewery;
