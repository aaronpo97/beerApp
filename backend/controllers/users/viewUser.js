import ServerError from '../../utilities/errors/ServerError.js';
import { SuccessResponse } from '../../utilities/response/responses.js';

const viewUser = async (req, res, next) => {
   try {
      const userToView = req.queriedUser;
      if (!userToView) {
         throw new ServerError('Cannot find a user with that id.', 401);
      }
      const status = 200;

      const payload = await userToView
         .populate({
            path: 'profile',
            populate: { path: 'affiliation', model: 'Brewery' },
         })
         .populate({
            path: 'profile',
            populate: { path: 'affiliation', model: 'Brewery' },
         });

      res.json(
         new SuccessResponse(
            `Viewing the user with the id of: ${userToView._id}`,
            status,
            payload,
            req.didTokenRegenerate ? req.accessToken : undefined
         )
      );
   } catch (error) {
      next(error);
   }
};

export default viewUser;
