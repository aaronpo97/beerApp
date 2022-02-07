import User from '../../database/models/User.js';

import sendPasswordResetEmail from '../../utilities/nodemailer/sendPasswordResetEmail.js';
import { generatePasswordResetToken } from '../../utilities/auth/generateTokens.js';
import SuccessResponse from '../../utilities/response/SuccessResponse.js';

const requestPasswordReset = async (req, res, next) => {
  // client will not be recieving any confirmation that an email was sent (for security reasons)
  try {
    const { username, email } = req.body;
    const user = await User.findOne({ username, email });
    if (!user) {
      res.json(new SuccessResponse('Request sent.', 200));
      return;
    }
    const passwordResetToken = await generatePasswordResetToken(user);
    await sendPasswordResetEmail(user.email, user, passwordResetToken);
    res.json(new SuccessResponse('Request sent.', 200));
  } catch (error) {
    next(error);
  }
};
export default requestPasswordReset;
