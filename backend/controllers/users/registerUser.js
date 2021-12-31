import jwt from 'jsonwebtoken';

import User from '../../database/models/User.js';
import ServerError from '../../utilities/errors/ServerError.js';

import sendConfirmationEmail from '../../utilities/nodemailer/sendConfirmationEmail.js';

const registerUser = async (req, res, next) => {
	try {
		const userToRegister = req.body;
		const { username, email, password, dateOfBirth, profile = {} } = userToRegister;
		const user = new User({ username, email, dateOfBirth, profile });

		await User.register(user, password);
		await user.save();

		const token = jwt.sign(
			{ userToConfirm: user.username, id: user._id },
			'this-should-be-a-better-secret',
			{ expiresIn: '10m' },
			{ algorithm: 'HS256' }
		);

		await sendConfirmationEmail(email, user, token);

		const newUser = await User.findById(user._id);

		const status = 201;
		res.status(status).json({
			status,
			newUser,
			success: true,
			message: 'New user created.',
		});
	} catch (error) {
		next(new ServerError(error.message, 400));
	}
};

export default registerUser;
