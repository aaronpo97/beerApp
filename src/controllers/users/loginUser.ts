import { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import User from '../../database/models/User';
import { generateAccessToken, generateRefreshToken } from '../../utilities/auth/generateTokens';
import SuccessResponse from '../../utilities/response/SuccessResponse';

dotenv.config();

declare global {
  namespace Express {
    interface Request {
      accessToken?: string;
      refreshToken?: string;
      didTokenRegenerate?: boolean;
    }
  }
}

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username } = req.body;
    const user = await User.findOne({ username });
    const refreshToken = await generateRefreshToken(user);

    req.refreshToken = refreshToken;
    const accessToken = await generateAccessToken(req);
    if (!user) throw new Error();

    const status = 200;

    const payload = {
      userId: user._id,
      refreshToken,
      accessToken,
    };
    next(
      new SuccessResponse(
        'User logged in',
        status,
        payload,
        req.didTokenRegenerate ? req.accessToken : undefined,
      ),
    );
  } catch (err: any) {
    next(err.message + err.stack);
  }
};

export default loginUser;
