import nodemailer from 'nodemailer';

import { fileURLToPath } from 'url';
import { dirname } from 'path';
import ejs from 'ejs';

import dotenv from 'dotenv';

dotenv.config();
const {
	MAIL_USERNAME: user,
	MAIL_PASSWORD: pass,
	OAUTH_CLIENTID: clientId,
	OAUTH_CLIENT_SECRET: clientSecret,
	OAUTH_REFRESH_TOKEN: refreshToken,
} = process.env;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sendEmail = async (email, userObj, token) => {
	try {
		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: { user, pass, clientId, clientSecret, refreshToken, type: 'OAuth2' },
		});

		const confirmationCode = token;
		const data = await ejs.renderFile(__dirname + '/confirmationEmail.ejs', { userObj, confirmationCode });
		const mailOptions = { subject: 'Welcome!', html: data, from: user, to: email };

		await transporter.sendMail(mailOptions);
	} catch (error) {
		return Promise.reject(error);
	}
};
export default sendEmail;
