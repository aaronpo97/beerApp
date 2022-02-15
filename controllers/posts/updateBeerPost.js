import ServerError from '../../utilities/errors/ServerError.js';
import SuccessResponse from '../../utilities/response/SuccessResponse.js';

import BeerPost from '../../database/models/BeerPost.js';

const updateBeerPost = async (req, res, next) => {
  try {
    const { post } = req;
    const beerUpdates = req.body;
    await post.updateOne(beerUpdates);
    await post.save();

    // eslint-disable-next-line no-underscore-dangle
    const updatedBeer = await BeerPost.findById(post._id);

    const status = 200;

    next(
      new SuccessResponse(
        // eslint-disable-next-line no-underscore-dangle
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
