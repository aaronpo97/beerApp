import User from '../../database/models/User.js';
import ServerError from '../../utilities/errors/ServerError.js';

import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const {
	MAIL_USERNAME: user,
	MAIL_PASSWORD: pass,
	OAUTH_CLIENTID: clientId,
	OAUTH_CLIENT_SECRET: clientSecret,
	OAUTH_REFRESH_TOKEN: refreshToken,
} = process.env;

const sendEmail = async email => {
	try {
		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user,
				pass,
				clientId,
				clientSecret,
				refreshToken,
				type: 'OAuth2',
			},
		});

		const mailOptions = {
			from: 'aaron_po@msn.com',
			to: email,
			subject: 'Nodemailer Project',
			text: 'Hi from your nodemailer project',
		};

		await transporter.sendMail(mailOptions);
	} catch (error) {
		return Promise.reject(error);
	}
};

const registerUser = async (req, res, next) => {
	try {
		const userToRegister = req.body;
		const { username, email, password, dateOfBirth, profile } = userToRegister;
		const user = new User({ username, email, dateOfBirth, profile });

		await User.register(user, password);
		await user.save();

		await sendEmail(email);

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
