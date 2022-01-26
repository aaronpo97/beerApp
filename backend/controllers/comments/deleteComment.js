import Comment from '../../database/models/Comment.js';
import { SuccessResponse } from '../../utilities/response/responses.js';

const deleteComment = async (req, res, next) => {
   try {
      const { commentId } = req.params;
      const commentToDelete = await Comment.findById(commentId);
      await commentToDelete.delete();
      res.json(
         new SuccessResponse(
            'Deleted comment.',
            200,
            undefined,
            req.newAccessToken ? req.newAccessToken : undefined
         )
      );
   } catch (error) {
      next(error);
   }
};
export default deleteComment;
