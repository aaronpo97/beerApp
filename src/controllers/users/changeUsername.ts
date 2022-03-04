import { Request, Response, NextFunction } from 'express';
import User from '../../database/models/User';
import SuccessResponse from '../../utilities/response/SuccessResponse';

const changeUsername = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { currentUser } = req;
    const { username } = req.body;

    currentUser.username = username;
    await currentUser.save();

    const updatedUser = await User.findById(currentUser._id);
    next(
      new SuccessResponse(
        `Updated the username for ${currentUser._id}`,
        200,
        updatedUser,
        req.newAccessToken ? req.newAccessToken : undefined,
      ),
    );
  } catch (error) {
    next(error);
  }
};

export default changeUsername;
