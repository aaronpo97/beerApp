import BeerPost from '../../database/models/BeerPost.js';
import ServerError from '../../utilities/errors/ServerError.js';
import { boolChecker } from '../../utilities/data/dataUtil.js';

import { SuccessResponse } from '../../utilities/response/responses.js';

const showBeerPost = async (req, res, next) => {
   const { id } = req.params;

   try {
      const payload = await BeerPost.findById(id)
         .populate('brewery', 'name')
         .populate('postedBy', 'username')
         .populate('images', 'url')
         .populate('likedBy', 'username');

      if (!payload) throw new ServerError('Could not find a post with that id.', 404);

      const status = 200;
      res.json(
         new SuccessResponse(
            `Sending data for beerpost '${id}'`,
            status,
            payload,
            req.didTokenRegenerate ? req.accessToken : undefined
         )
      );
   } catch (error) {
      next(error);
   }
};

export default showBeerPost;
