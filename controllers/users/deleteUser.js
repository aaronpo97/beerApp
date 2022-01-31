import ServerError from '../../utilities/errors/ServerError.js';
import BeerPost from '../../database/models/BeerPost.js';
import Image from '../../database/models/Image.js';
import Brewery from '../../database/models/Brewery.js';

import deletePost from '../../utilities/deletion/deletePost.js';
import deleteImage from '../../utilities/deletion/deleteImage.js';
import SuccessResponse from '../../utilities/response/SuccessResponse.js';

const deleteUser = async (req, res, next) => {
  try {
    if (!req.currentUser) throw new ServerError('Cannot delete user.', 412);

    const beerPosts = await BeerPost.find({ author: req.currentUser });
    const images = await Image.find({ uploadedBy: req.currentUser });

    const { affiliation } = req.currentUser.profile;

    const affiliationId = affiliation ? affiliation.toString() : null;
    const afilliatedBrewery = affiliation ? await Brewery.findById(affiliationId) : null;

    if (beerPosts.length) {
      // eslint-disable-next-line no-restricted-syntax
      for (const post of beerPosts) {
        console.log(post);
        await deletePost(post);
      }
    }
    if (images.length) {
      for (const image of images) {
        await deleteImage(image);
      }
    }

    if (afilliatedBrewery) {
      await afilliatedBrewery.updateOne({ $pull: { associatedProfiles: req.currentUser._id } });
    }
    await req.currentUser.delete();

    const status = 200;

    res
      .status(status)
      .json(
        new SuccessResponse(
          'Successfully deleted user.',
          status,
          undefined,
          req.didTokenRegenerate ? req.accessToken : undefined,
        ),
      );
  } catch (error) {
    next(error);
  }
};
export default deleteUser;
