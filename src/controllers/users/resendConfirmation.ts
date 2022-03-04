import dotenv from 'dotenv';

import SuccessResponse from '../../utilities/response/SuccessResponse';
import sendConfirmationEmail from '../../utilities/nodemailer/sendConfirmationEmail';
import { generateConfirmationToken } from '../../utilities/auth/generateTokens';
import { Request, Response, NextFunction } from 'express';

dotenv.config();

const resendConfirmation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  // generating a new confirmation token for if the initial one expires
  try {
    const user = req.currentUser;
    const confirmationToken = await generateConfirmationToken(user);

    const message = `Generated new confirmation token for user: ${user.username}`;
    const status = 200;

    await sendConfirmationEmail(user.email, user, confirmationToken);
    next(new SuccessResponse(message, status, undefined, undefined));
  } catch (error) {
    next(error);
  }
};
export default resendConfirmation;
