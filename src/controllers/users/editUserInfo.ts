import User from '../../database/models/User';
import SuccessResponse from '../../utilities/response/SuccessResponse';
import { Request, Response, NextFunction } from 'express';

const editUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { firstName, lastName, email, username } = req.body;
    // @ts-ignore
    const updatedUser = await User.findByIdAndUpdate(req.queriedUser._id, {
      firstName,
      lastName,
      email,
      username,
    });

    const status = 200;
    const message = `Successfully edited user: ${updatedUser._id}`;

    next(
      new SuccessResponse(message, status, undefined, req.didTokenRegenerate ? req.accessToken : undefined),
    );
  } catch (error) {
    next(error);
  }
};

export default editUser;
