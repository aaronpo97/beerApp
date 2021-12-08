import jwt from 'jsonwebtoken';
import ServerError from '../../utilities/ServerError.js';
import User from '../../database/models/User.js';

import dotenv from 'dotenv';
dotenv.config();
const { JWT_SECRET } = process.env;

const verifyJWT = async (req, res, next) => {
	try {
		const token = req.headers['x-access-token'];
		const decoded = jwt.verify(token, JWT_SECRET);

		req.currentUser = await User.findById(decoded.id);
		if (!req.currentUser) throw new ServerError('Unable to authenticate user.', 401);
		next();
	} catch (error) {
		if (error.type === 'JsonWebTokenError') {
			next(new ServerError('Invalid signature.', 401));
		}
		next(error);
	}
};

export default verifyJWT;
