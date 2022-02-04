import process from 'process';
import jwt from 'jsonwebtoken';

import ServerError from '../../utilities/errors/ServerError.js';
import SuccessResponse from '../../utilities/response/SuccessResponse.js';
import User from '../../database/models/User.js';

const { PASSWORD_RESET_SECRET } = process.env;

const resetPassword = async (req, res, next) => {
  try {
    const { newPassword } = req.body;
    if (!newPassword) {
      throw new ServerError('New password required.', 400);
    }

    const { passwordResetToken, userId } = req.params;
    const decoded = jwt.verify(passwordResetToken, PASSWORD_RESET_SECRET);
    const decodedUser = await User.findById(decoded.id);

    if (decodedUser._id.toString() !== userId) {
      throw new ServerError('Invalid link', 400);
    }
    await decodedUser.setPassword(newPassword);
    await decodedUser.save();

    res.json(new SuccessResponse(`Changed password for ${decodedUser.username}`, 200));
  } catch (error) {
    next(error);
  }
};

export default resetPassword;
