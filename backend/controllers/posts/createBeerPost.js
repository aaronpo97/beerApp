import BeerPost from '../../database/models/BeerPost.js';
import Brewery from '../../database/models/Brewery.js';

import ServerError from '../../utilities/errors/ServerError.js';
import SuccessResponse from '../../utilities/response/SuccessResponse.js';

const createBeerPost = async (req, res, next) => {
  try {
    const { name, type, description, abv, ibu, images, brewery: breweryId } = req.body;

    const brewery = await Brewery.findById(breweryId);
    if (!brewery) throw new ServerError('Cannot find a brewery with that id.', 404);

    // create the post
    const post = new BeerPost({
      name,
      type,
      description,
      brewery,
      images,
      abv,
      ibu,
      postedBy: req.currentUser,
    });
    await post.save();

    await brewery.beers.push(post);
    req.currentUser.posts.push(post);

    await brewery.save();
    await req.currentUser.save();

    // send the response
    const status = 201;

    // eslint-disable-next-line no-underscore-dangle
    const createdPost = await BeerPost.findById(post._id)
      .populate('postedBy', 'username')
      .populate('images', 'url filename')
      .populate('brewery', 'name');

    res
      .status(status)
      .json(
        new SuccessResponse(
          `Post ${createdPost.name} created.`,
          status,
          createdPost,
          req.newAccessToken ? req.newAccessToken : undefined,
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
