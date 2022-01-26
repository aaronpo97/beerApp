import Comment from '../../database/models/Comment.js';
import { SuccessResponse } from '../../utilities/response/responses.js';

const editComment = async (req, res, next) => {
   try {
      const { commentId } = req.params;
      const { body } = req.body;

      await Comment.updateOne({ _id: commentId }, { body });
      const updatedComment = await Comment.findById(commentId);

      res.json(
         new SuccessResponse(
            'Comment updated.',
            200,
            updatedComment,
            req.newAccessToken ? req.newAccessToken : undefined
         )
      );
   } catch (error) {
      next(error);
   }
};
export default editComment;
