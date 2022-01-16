import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import { SuccessResponse } from '../../utilities/response/responses.js';
import sendConfirmationEmail from '../../utilities/nodemailer/sendConfirmationEmail.js';

dotenv.config();

const { CONFIRMATION_TOKEN_SECRET } = process.env;

const resendConfirmation = async (req, res, next) => {
   //generating a new confirmation token for if the initial one expires
   try {
      const user = req.currentUser;
      const confirmationToken = jwt.sign(
         { userToConfirm: user.username, id: user._id },
         CONFIRMATION_TOKEN_SECRET,
         { expiresIn: '10m' },
         { algorithm: 'HS256' }
      );

      const message = `Generated new confirmation token for user: ${user.username}`;
      const status = 200;

      // await sendConfirmationEmail(user.email, user, confirmationToken);
      const link = `http://localhost:5000/users/confirm/${user._id}/${confirmationToken}`;

      const payload = { confirmationToken, link };
      res.json(new SuccessResponse(message, status, payload)).status(200);
   } catch (error) {
      next(error);
   }
};
export default resendConfirmation;
