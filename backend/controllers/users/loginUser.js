import jwt from 'jsonwebtoken';
import User from '../../database/models/User.js';
import dotenv from 'dotenv';
import generateAccessToken from '../../utilities/auth/generateAccessToken.js';

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
		res.json({
			accessToken,
			refreshToken,
			status,
			message: 'User logged in.',
			success: true,
			// id: user._id,
			// brewery: user.profile.affiliation,
		});
	} catch (err) {
		console.log(err);
		next(err.message + err.stack);
	}
};

export default loginUser;
