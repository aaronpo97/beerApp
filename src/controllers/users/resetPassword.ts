import process from 'process';
import jwt from 'jsonwebtoken';

import ServerError from '../../utilities/errors/ServerError';
import SuccessResponse from '../../utilities/response/SuccessResponse';
import User from '../../database/models/User';

import { Request, Response, NextFunction } from 'express';
const { PASSWORD_RESET_SECRET } = process.env;

const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { newPassword } = req.body;
    if (!newPassword) {
      throw new ServerError('New password required.', 400);
    }

    const { passwordResetToken, userId } = req.params;
    const decoded = jwt.verify(passwordResetToken, PASSWORD_RESET_SECRET);
    // @ts-expect-error
    const decodedUser = await User.findById(decoded.id);

    if (decodedUser._id.toString() !== userId) {
      throw new ServerError('Invalid link', 400);
    }

    // @ts-expect-error
    await decodedUser.setPassword(newPassword);
    await decodedUser.save();

    next(new SuccessResponse(`Changed password for ${decodedUser.username}`, 200, undefined, undefined));
  } catch (error) {
    next(error);
  }
};

export default resetPassword;
