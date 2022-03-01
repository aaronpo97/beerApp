import ServerError from '../../utilities/errors/ServerError';
import { generateAccessToken } from '../../utilities/auth/generateTokens';

import { Request, Response, NextFunction } from 'express';

import jwt, { JwtPayload, Jwt } from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      accessToken?: string;
      refreshToken?: string;
      didTokenRegenerate?: boolean;
      headers: {
        'x-auth-token': string;
        'x-access-token': string;
      };
      decoded: string | JwtPayload;
    }
  }
}

const checkTokens = async (req: Request, res: Response, next: NextFunction) => {
  const { ACCESS_TOKEN_SECRET } = process.env;

  try {
    const refreshToken = req.headers['x-auth-token'];
    const accessToken = req.headers['x-access-token'];

    if (!accessToken) throw new ServerError('No access token was provided.', 400);
    if (!refreshToken) throw new ServerError('No refresh token was provided.', 400);

    const decoded = jwt.verify(accessToken as string, ACCESS_TOKEN_SECRET);

    req.accessToken = accessToken as string;
    req.decoded = decoded;
    req.didTokenRegenerate = false;

    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      try {
        const accessToken = await generateAccessToken(req);
        req.accessToken = accessToken;
        req.didTokenRegenerate = true;
        req.decoded = null;
        next();
        return;
      } catch (error) {
        next(error);
        return;
      }
    }
    next();
  }
};

export default checkTokens;
