import nodemailer from 'nodemailer';
import ejs from 'ejs';
import process from 'process';

import dotenv from 'dotenv';
import User, { UserInterface } from '../../database/models/User';
import { Document } from 'mongoose';

dotenv.config();
const {
  MAIL_USERNAME: user,
  MAIL_PASSWORD: pass,
  OAUTH_CLIENTID: clientId,
  OAUTH_CLIENT_SECRET: clientSecret,
  OAUTH_REFRESH_TOKEN: refreshToken,
  BASE_URL,
} = process.env;

const sendPasswordResetEmail = async (
  email: string,
  userObj: UserInterface & Document<any, any, UserInterface>,
  passwordResetToken: string,
) => {
  try {
    const transporter = nodemailer.createTransport({
      // @ts-expect-error
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
