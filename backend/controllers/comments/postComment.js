import BeerPost from '../../database/models/BeerPost.js';
import { SuccessResponse } from '../../utilities/response/responses.js';

import Comment from '../../database/models/Comment.js';

const postComment = async (req, res, next) => {
   try {
      const { comment: body } = req.body;
      console.log(req.params);
      const { currentUser: author } = req;

      const beerPost = await BeerPost.findById(req.params.id);

      const comment = new Comment({ body, author });

      if (!beerPost) throw new Error('notfound');
      beerPost.comments.push(comment);
      await beerPost.save();

      res.send(
         new SuccessResponse(
            `Posted a comment on ${beerPost.name}.`,
            200,
            comment,
            req.newAccessToken ? req.newAccessToken : undefined
         )
      );
   } catch (error) {
      next(error);
   }
};

export default postComment;
