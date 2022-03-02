import { Request, Response, NextFunction } from 'express';
import BeerPost from '../../database/models/BeerPost';
import Brewery from '../../database/models/Brewery';
import ServerError from '../../utilities/errors/ServerError';
import { SuccessResponse } from '../../utilities/response/SuccessResponse';
import deletePost from '../../utilities/deletion/deletePost';

const deleteBrewery = async (req: Request, res: Response, next: NextFunction) => {
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
