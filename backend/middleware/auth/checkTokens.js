import jwt from 'jsonwebtoken';
import ServerError from '../../utilities/errors/ServerError.js';
import { generateAccessToken } from '../../utilities/auth/generateTokens.js';

const checkTokens = async (req, res, next) => {
  const { ACCESS_TOKEN_SECRET } = process.env;

  try {
    const refreshToken = req.headers['x-auth-token'];
    const accessToken = req.headers['x-access-token'];

    if (!accessToken) throw new ServerError('No access token was provided.', 400);
    if (!refreshToken) throw new ServerError('No refresh token was provided.', 400);

    const decoded = jwt.verify(accessToken, ACCESS_TOKEN_SECRET);

    req.accessToken = accessToken;
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
