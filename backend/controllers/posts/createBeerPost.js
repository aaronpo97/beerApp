import BeerPost from '../../database/models/BeerPost.js';
import Brewery from '../../database/models/Brewery.js';

import ServerError from '../../utilities/errors/ServerError.js';
import { SuccessResponse } from '../../utilities/response/responses.js';

const createBeerPost = async (req, res, next) => {
   try {
      const { name, type, description, abv, ibu, images, brewery: breweryID } = req.body;

      const brewery = await Brewery.findById(breweryID);
      if (!brewery) throw new ServerError('Cannot find a brewery with that id.', 404);

      //create the post
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

      brewery.beers.push(post);
      req.currentUser.posts.push(post);

      await brewery.save();
      await req.currentUser.save();

      //send the response
      const status = 201;

      res.status(status).json(
         new SuccessResponse(
            `Resource beerPost created. id: ${post._id}`,
            status,
            post,
            req.didTokenRegenerate ? req.accessToken : undefined
         )
      );
   } catch (error) {
      switch (error.name) {
         case 'ValidationError':
            next(new ServerError(`Mongoose validation error. ${error.message}`, 401));
            break;
         case 'CastError':
            next(new ServerError(`Cannot create beer post. ${error.message}`, 401));
         default:
            next(error);
            break;
      }
   }
};

export default createBeerPost;
