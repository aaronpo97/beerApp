import User from '../database/models/User.js';
import jwt from 'jsonwebtoken';
import ServerError from '../utilities/errors/ServerError.js';

const generateAccessToken = async (req, res, next) => {
	const { REFRESH_TOKEN_SECRET, ACCESS_TOKEN_SECRET } = process.env;

	const refreshToken = req.headers['x-auth-token'];

	try {
		const decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);

		const user = await User.findById(decoded.audience);
		if (!user) throw new ServerError('Invalid JWT.', 401);
		const token = jwt.sign(
			{ audience: user._id, issuer: 'http://localhost:5000' },
			ACCESS_TOKEN_SECRET,
			{ expiresIn: '1m' },
			{ algorithm: 'HS256' }
		);
		return token;
	} catch (error) {
		return Promise.reject(error);
	}
};

export default generateAccessToken;
