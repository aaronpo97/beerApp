import { Request, Response, NextFunction } from 'express';
import { ObjectId } from 'mongoose';
import BeerPost from '../../database/models/BeerPost';
import SuccessResponse from '../../utilities/response/SuccessResponse';

const likeUnlikePost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const beer = await BeerPost.findById(id);
    const { currentUser } = req;

    const isPostLikedByUser = currentUser.profile.likes
      .map((objectId: ObjectId) => objectId.toString())
      .includes((beer._id as ObjectId).toString());

    const isUserListed = beer.likedBy.map((objID) => objID.toString()).includes(currentUser._id.toString());
    //

    if (isPostLikedByUser && isUserListed) {
      beer.likedBy = (beer.likedBy as any).pull(currentUser);
      //@ts-ignore
      currentUser.profile.likes = currentUser.profile.likes.pull(beer);
      await currentUser.save();
      await beer.save();

      next(
        new SuccessResponse(
          `Successfully unliked post.`,
          200,
          null,
          req.didTokenRegenerate ? req.accessToken : undefined,
        ),
      );
    } else {
      beer.likedBy.push(currentUser);
      //@ts-ignore
      currentUser.profile.likes.push(beer);
      await currentUser.save();
      await beer.save();

      const status = 200;
      next(
        new SuccessResponse(
          `Succesfully liked post '${beer.name}'`,
          status,
          undefined,
          req.didTokenRegenerate ? req.accessToken : undefined,
        ),
      );
    }
  } catch (error) {
    next(error);
  }
};

export default likeUnlikePost;
