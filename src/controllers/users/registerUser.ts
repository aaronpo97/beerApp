import dotenv from 'dotenv';
import User from '../../database/models/User.js';
import ServerError from '../../utilities/errors/ServerError.js';
import sendConfirmationEmail from '../../utilities/nodemailer/sendConfirmationEmail.js';

import { Request, Response, NextFunction } from 'express';

import {
  generateAccessToken,
  generateConfirmationToken,
  generateRefreshToken,
} from '../../utilities/auth/generateTokens.js';

import { SuccessResponse } from '../../utilities/response/SuccessResponse';

dotenv.config();

interface RegistrationInfo {
  username: string;
  email: string;
  password: string;
  dateOfBirth: string;
  firstName: string;
  lastName: string;
}

interface CreateProfileInfo {
  likes: [];
  affiliation: null;
  displayImage: null;
  currentCity: null;
  bio: null;
  gender: 'Male' | 'Female' | 'Other' | null;
}

const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userToRegister: RegistrationInfo = req.body;

    const { username, email, password, dateOfBirth, firstName, lastName } = userToRegister;

    const profile: CreateProfileInfo = {
      likes: [],
      affiliation: null,
      displayImage: null,
      currentCity: null,
      bio: null,
      gender: null,
    };
    const user = new User({ username, email, dateOfBirth, profile, firstName, lastName });
    // @ts-ignore
    await User.register(user, password);
    await user.save();

    const confirmationToken = await generateConfirmationToken(user);
    await sendConfirmationEmail(email, user, confirmationToken);

    const refreshToken = await generateRefreshToken(user);
    req.refreshToken = refreshToken;

    const accessToken = await generateAccessToken(req);

    const newUser = await User.findById(user._id);
    if (!newUser) throw new ServerError('User registration failed.', 400);

    const message = 'New user created.';
    const status = 201;
    const payload = {
      newUser,
      refreshToken,
      accessToken,
    };

    next(new SuccessResponse(message, status, payload, undefined));
  } catch (error) {
    next(new ServerError(error.message, 400));
  }
};

export default registerUser;
