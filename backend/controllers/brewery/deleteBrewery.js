import BeerPost from '../../database/models/BeerPost.js';
import Brewery from '../../database/models/Brewery.js';
import ServerError from '../../utilities/errors/ServerError.js';
import { SuccessResponse } from '../../utilities/response/responses.js';
import Comment from '../../database/models/Comment.js';

const deleteBrewery = async (req, res, next) => {
   try {
      const { id } = req.params;
      const brewery = await Brewery.findById(id);

      if (!brewery) {
         throw new ServerError('Cannot delete that brewery as it does not exist.', 404);
      }

      if (brewery.beers.length) {
         for (let beerPostId of brewery.beers) {
            const beerPost = await BeerPost.findById(beerPostId.toString());

            for (let commentId of beerPost.comments) {
               const comment = await Comment.findById(commentId.toString());
               await comment.deleteOne();
            }

            await beerPost.delete();
         }
      }
      brewery.deleteOne();

      const status = 200;
      const payload = { brewery, deleted: true };
      res.json(
         new SuccessResponse(
            `Successfully deleted brewery '${id}'.`,
            status,
            payload,
            req.didTokenRegenerate ? req.accessToken : undefined
         )
      );
   } catch (error) {
      next(error);
   }
};

export default deleteBrewery;
