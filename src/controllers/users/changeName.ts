import { NextFunction, Request, Response } from 'express';
import User from '../../database/models/User';
import SuccessResponse from '../../utilities/response/SuccessResponse';

const changeName = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { currentUser } = req;
    const { firstName, lastName } = req.body;

    currentUser.firstName = firstName;
    currentUser.lastName = lastName;

    await currentUser.save();

    const updatedUser = await User.findById(currentUser._id);

    next(
      new SuccessResponse(
        `Updated the first/last name for ${updatedUser.username}`,
        200,
        updatedUser,
        req.newAccessToken ?? undefined,
      ),
    );
  } catch (error) {
    next(error);
  }
};

export default changeName;
