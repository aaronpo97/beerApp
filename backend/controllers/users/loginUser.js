import jwt from 'jsonwebtoken';
import User from '../../database/models/User.js';
import dotenv from 'dotenv';
import { generateAccessToken, generateRefreshToken } from '../../utilities/auth/generateTokens.js';
import { SuccessResponse } from '../../utilities/response/responses.js';

dotenv.config();

const { REFRESH_TOKEN_SECRET } = process.env;

const loginUser = async (req, res, next) => {
   try {
      const { username } = req.body;
      const user = await User.findOne({ username });
      const refreshToken = await generateRefreshToken(user);

      req.refreshToken = refreshToken; // this is used in generateAccessToken
      const accessToken = await generateAccessToken(req);
      if (!user) throw new Error();

      const status = 200;

      const payload = {
         userId: user._id,
         refreshToken,
         accessToken: accessToken,
         associatedBrewery: user.profile.affiliation ? user.profile.affiliation : undefined,
      };
      res.json(
         new SuccessResponse(
            'User logged in',
            status,
            payload,
            req.didTokenRegenerate ? req.accessToken : undefined
         )
      );
   } catch (err) {
      next(err.message + err.stack);
   }
};

export default loginUser;
