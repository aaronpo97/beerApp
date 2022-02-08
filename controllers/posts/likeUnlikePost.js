import BeerPost from '../../database/models/BeerPost.js';
import SuccessResponse from '../../utilities/response/SuccessResponse.js';

const likeUnlikePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const beer = await BeerPost.findById(id);
    const { currentUser } = req;

    const isPostLikedByUser = currentUser.profile.likes
      .map((objectID) => objectID.toString())
      .includes(beer._id.toString());

    const isUserListed = beer.likedBy
      .map((objID) => objID.toString())
      .includes(currentUser._id.toString());
    //

    if (isPostLikedByUser && isUserListed) {
      beer.likedBy = beer.likedBy.pull(currentUser);
      currentUser.profile.likes = currentUser.profile.likes.pull(beer);
      await currentUser.save();
      await beer.save();

      res.json(
        new SuccessResponse(
          `Successfully unliked post.`,
          undefined,
          undefined,
          req.didTokenRegenerate ? req.accessToken : undefined,
        ),
      );
    } else {
      beer.likedBy.push(currentUser);
      currentUser.profile.likes.push(beer);
      await currentUser.save();
      await beer.save();

      const status = 204;
      res
        .json(
          new SuccessResponse(
            `Succesfully liked post '${beer.name}'`,
            undefined,
            undefined,
            req.didTokenRegenerate ? req.accessToken : undefined,
          ),
        )
        .status(status);
    }
  } catch (error) {
    next(error);
  }
};

export default likeUnlikePost;
