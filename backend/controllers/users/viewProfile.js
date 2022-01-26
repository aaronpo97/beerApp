import { SuccessResponse } from '../../utilities/response/responses.js';
import User from '../../database/models/User.js';
import ServerError from '../../utilities/errors/ServerError.js';

const viewProfile = async (req, res, next) => {
   try {
      const { id } = req.params;

      const user = await User.findById(
         id,
         'username dateOfBirth firstName lastName createdAt posts'
      ).populate('posts', 'name brewery');
      const userProfileLikes = await User.findById(id, 'profile').populate({
         path: 'profile',
         populate: { path: 'likes', model: 'BeerPost' },
      });

      const userProfileDisplayImage = await User.findById(id, 'profile').populate({
         path: 'profile',
         populate: { path: 'displayImage' },
      });

      if (!user) throw new ServerError('Unable to find that user.', 404);

      const { username, dateOfBirth, firstName, lastName, createdAt, posts } = user;
      const status = 200;
      const payload = {
         username,
         dateOfBirth,
         firstName,
         lastName,
         createdAt,
         posts,
         likes: userProfileLikes.profile.likes,
         displayImage: userProfileDisplayImage.profile.displayImage,
         bio: userProfileLikes.profile.bio,
      };

      res.json(
         new SuccessResponse(
            `Viewing ${user.username}'s profile.`,
            status,
            payload,
            req.didTokenRegenerate ? req.accessToken : undefined
         )
      );
   } catch (error) {
      next(error);
   }
};

export default viewProfile;
