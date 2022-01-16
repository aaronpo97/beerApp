import jwt from 'jsonwebtoken';

import User from '../../database/models/User.js';
import ServerError from '../../utilities/errors/ServerError.js';

import sendConfirmationEmail from '../../utilities/nodemailer/sendConfirmationEmail.js';
import { generateAccessToken, generateRefreshToken } from '../../utilities/auth/generateTokens.js';

import dotenv from 'dotenv';
import { SuccessResponse } from '../../utilities/response/responses.js';

dotenv.config();

const { CONFIRMATION_TOKEN_SECRET } = process.env;

const registerUser = async (req, res, next) => {
   try {
      const userToRegister = req.body;
      const { username, email, password, dateOfBirth, firstName, lastName } = userToRegister;

      const profile = {
         likes: null,
         affiliation: null,
         displayImage: null,
         currentCity: null,
         bio: null,
         gender: null,
      };
      const user = new User({ username, email, dateOfBirth, profile, firstName, lastName });

      await User.register(user, password);
      await user.save();

      const confirmationToken = jwt.sign(
         { userToConfirm: user.username, id: user._id },
         CONFIRMATION_TOKEN_SECRET,
         { expiresIn: '10m' },
         { algorithm: 'HS256' }
      );

      // await sendConfirmationEmail(email, user, confirmationToken);

      const refreshToken = await generateRefreshToken(user);
      req.refreshToken = refreshToken;
      const accessToken = await generateAccessToken(req);

      const link = `http://localhost:3000/confirmaccount/${user._id}/${confirmationToken}`;

      const newUser = await User.findById(user._id);
      if (!newUser) throw new ServerError('User registration failed.', 400);

      const status = 201;
      res.status(status).json(
         new SuccessResponse(`New user created.`, status, {
            newUser,
            link,
            refreshToken,
            accessToken,
         })
      );
   } catch (error) {
      next(new ServerError(error.message, 400));
   }
};

export default registerUser;
