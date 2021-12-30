import jwt from 'jsonwebtoken';
import User from '../../database/models/User.js';
import dotenv from 'dotenv';

dotenv.config();

const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

const loginUser = async (req, res, next) => {
	try {
		const { username } = req.body;
		const user = await User.findOne({ username });
		const accessToken = jwt.sign(
			{ audience: user._id, issuer: 'http://localhost:5000/login' },
			ACCESS_TOKEN_SECRET,
			{ expiresIn: '1m' },
			{ algorithm: 'HS256' }
		);
		const refreshToken = jwt.sign(
			{ audience: user._id, issuer: 'http://localhost:5000' },
			REFRESH_TOKEN_SECRET,
			{ expiresIn: '43200m' },
			{ algorithm: 'HS256' }
		);
		if (!user) throw new Error();

		const status = 200;
		res.json({
			message: 'User logged in.',
			success: true,
			accessToken,
			refreshToken,
			status,
			id: user._id,
			brewery: user.profile.affiliation,
		});
	} catch (err) {
		console.log(err);
		next(err.message + err.stack);
	}
};

export default loginUser;
