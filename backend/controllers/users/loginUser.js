import jwt from 'jsonwebtoken';
import User from '../../database/models/User.js';
import dotenv from 'dotenv';
import { generateAccessToken } from '../../utilities/auth/generateTokens.js';
import { SuccessResponse } from '../../utilities/response/responses.js';

dotenv.config();

const { REFRESH_TOKEN_SECRET } = process.env;

const loginUser = async (req, res, next) => {
   try {
      const { username } = req.body;
      const user = await User.findOne({ username });
      const refreshToken = jwt.sign(
         { audience: user._id, issuer: 'http://localhost:5000' },
         REFRESH_TOKEN_SECRET,
         { expiresIn: '43200m' },
         { algorithm: 'HS256' }
      );

      req.refreshToken = refreshToken;
      const accessToken = await generateAccessToken(req);
      if (!user) throw new Error();

      const status = 200;

      const payload = {
         userId: user._id,
         refreshToken: req.refreshToken,
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
      console.log(err);
      next(err.message + err.stack);
   }
};

export default loginUser;
