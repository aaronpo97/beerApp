import ServerError from '../../utilities/errors/ServerError';
import SuccessResponse from '../../utilities/response/SuccessResponse';
import { Request, Response, NextFunction } from 'express';

const viewUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userToView = req.queriedUser;
    if (!userToView) {
      throw new ServerError('Cannot find a user with that id.', 401);
    }
    const status = 200;

    const payload = await userToView.populate({
      path: 'profile',
      populate: { path: 'affiliation', model: 'Brewery' },
    });

    next(
      new SuccessResponse(
        `Viewing the user with the id of: ${userToView._id}`,
        status,
        payload,
        req.didTokenRegenerate ? req.accessToken : undefined,
      ),
    );
  } catch (error) {
    next(error);
  }
};

export default viewUser;
