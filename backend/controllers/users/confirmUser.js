import jwt from 'jsonwebtoken';
import User from '../../database/models/User.js';
import ServerError from '../../utilities/errors/ServerError.js';

import dotenv from 'dotenv';
import { SuccessResponse } from '../../utilities/response/responses.js';

dotenv.config();
const { CONFIRMATION_TOKEN_SECRET } = process.env;

const confirmUser = async (req, res, next) => {
	try {
		const { userID, token } = req.params;

		const decoded = jwt.verify(token, CONFIRMATION_TOKEN_SECRET);
		const userToConfirm = await User.findById(userID);

		if (userToConfirm.isAccountConfirmed === true) {
			throw new ServerError('Account is already confirmed', 400);
		}

		const decodedUser = await User.findById(decoded.id);

		if (decodedUser._id.toString() !== userToConfirm._id.toString()) {
			throw new ServerError('Invalid link', 400);
		}
		userToConfirm.isAccountConfirmed = true;
		await userToConfirm.save();

		const status = 200;

		res.json(
			new SuccessResponse(
				'Account confirmed.',
				status,
				undefined,
				req.didTokenRegenerate ? req.accessToken : undefined
			)
		).status(200);
	} catch (error) {
		if (error.name === 'CastError') {
			next(new ServerError('Invalid user id detected. Unable to authenticate user.', 400));
		}
		next(error);
	}
};
export default confirmUser;
