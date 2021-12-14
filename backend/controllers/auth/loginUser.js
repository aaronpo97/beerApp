import jwt from 'jsonwebtoken';
import User from '../../database/models/User.js';
import dotenv from 'dotenv';

dotenv.config();

const { JWT_SECRET } = process.env;

const loginUser = async (req, res, next) => {
	try {
		const { username } = req.body;
		const user = await User.findOne({ username });
		const token = jwt.sign(
			{ loggedInAs: user.username, id: user._id },
			JWT_SECRET,
			{ expiresIn: '60m' },
			{ algorithm: 'HS256' }
		);
		if (!user) throw new Error();

		const status = 200;
		res.json({
			message: 'User logged in.',
			success: true,
			token,
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
