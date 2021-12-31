import jwt from 'jsonwebtoken';
import ServerError from '../../utilities/errors/ServerError.js';
import User from '../../database/models/User.js';

import dotenv from 'dotenv';
dotenv.config();
const { ACCESS_TOKEN_SECRET } = process.env;

const verifyAccessToken = async (req, res, next) => {
	try {
		const token = req.accessToken;

		const decoded = !req.decoded ? jwt.verify(token, ACCESS_TOKEN_SECRET) : req.decoded;

		req.currentUser = await User.findById(decoded.audience);
		if (!req.currentUser) throw new ServerError('Unable to authenticate user.', 401);
		next();
	} catch (error) {
		if (error.name === 'JsonWebTokenError') {
			next(new ServerError('Invalid signature.', 401));
		}
		if (error.name === 'jwt expired') {
			next(new ServerError('Cannot fulfill request as your JWT is expired.', 401));
		}
		next(error);
	}
};

export default verifyAccessToken;
