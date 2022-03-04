import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';
import User from '../../database/models/User';
import ServerError from '../../utilities/errors/ServerError';

import SuccessResponse from '../../utilities/response/SuccessResponse';

dotenv.config();
const { CONFIRMATION_TOKEN_SECRET } = process.env;

const confirmUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { userID, token } = req.params;

    const decoded = jwt.verify(token, CONFIRMATION_TOKEN_SECRET);
    const userToConfirm = await User.findById(userID);
    if (!userToConfirm) throw new ServerError('Cannot find that user.', 404);

    if (userToConfirm.isAccountConfirmed === true) {
      throw new ServerError('Account is already confirmed', 400);
    }
    // @ts-expect-error
    const decodedUser = await User.findById(decoded.id);

    if (decodedUser._id.toString() !== userToConfirm._id.toString()) {
      throw new ServerError('Invalid link', 400);
    }
    userToConfirm.isAccountConfirmed = true;
    await userToConfirm.save();

    const status = 200;
    const payload = { decodedUser, confirmed: true };

    next(
      new SuccessResponse(
        'Account confirmed.',
        status,
        payload,
        req.didTokenRegenerate ? req.accessToken : undefined,
      ),
    );
  } catch (error) {
    if (error.name === 'CastError') {
      next(new ServerError('Invalid user id detected. Unable to authenticate user.', 400));
    }
    next(error);
  }
};
export default confirmUser;
