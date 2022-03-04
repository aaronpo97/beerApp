import nodemailer from 'nodemailer';
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

const sendEmail = async (email, userObj, confirmationToken) => {
  try {
    const transporter = nodemailer.createTransport({
      //@ts-expect-error
      service: 'gmail',
      auth: { user, pass, clientId, clientSecret, refreshToken, type: 'OAuth2' },
    });
    const confirmationLink = `${BASE_URL}/confirmaccount/${userObj._id}/${confirmationToken}`;
    const data = await ejs.renderFile(`${__dirname}/confirmationEmail.ejs`, {
      userObj,
      confirmationLink,
    });
    const mailOptions = { subject: 'Welcome!', html: data, from: user, to: email };
    return await transporter.sendMail(mailOptions);
  } catch (error) {
    return Promise.reject(error);
  }
};
export default sendEmail;
