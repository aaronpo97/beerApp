import User from '../../database/models/User';

import sendPasswordResetEmail from '../../utilities/nodemailer/sendPasswordResetEmail';
import { generatePasswordResetToken } from '../../utilities/auth/generateTokens';
import SuccessResponse from '../../utilities/response/SuccessResponse';
import { Request, Response, NextFunction } from 'express';

const requestPasswordReset = async (req: Request, res: Response, next: NextFunction) => {
  // client will not be recieving any confirmation that an email was sent (for security reasons)
  try {
    const { username, email } = req.body;
    const user = await User.findOne({ username, email });
    if (!user) {
      res.json(new SuccessResponse('Request sent.', 200, undefined, undefined));
      return;
    }
    const passwordResetToken = await generatePasswordResetToken(user);
    await sendPasswordResetEmail(user.email, user, passwordResetToken);
    next(new SuccessResponse('Request sent.', 200, undefined, undefined));
  } catch (error) {
    next(error);
  }
};
export default requestPasswordReset;
