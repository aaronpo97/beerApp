import nodemailer from 'nodemailer';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import ejs from 'ejs';
import process from 'process';

import dotenv from 'dotenv';

dotenv.config();
const {
  MAIL_USERNAME: user,
  MAIL_PASSWORD: pass,
  OAUTH_CLIENTID: clientId,
  OAUTH_CLIENT_SECRET: clientSecret,
  OAUTH_REFRESH_TOKEN: refreshToken,
  BASE_URL,
} = process.env;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sendPasswordResetEmail = async (email, userObj, passwordResetToken) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user, pass, clientId, clientSecret, refreshToken, type: 'OAuth2' },
    });

    const passwordResetLink = `${BASE_URL}/resetpassword/${userObj._id}/${passwordResetToken}`;
    const data = await ejs.renderFile(`${__dirname}/passwordResetEmail.ejs`, {
      userObj,
      passwordResetLink,
    });

    const mailOptions = { subject: 'Welcome!', html: data, from: user, to: email };
    return await transporter.sendMail(mailOptions);
  } catch (error) {
    return Promise.reject(error);
  }
};
export default sendPasswordResetEmail;
