import express from 'express';

import loginUser from '../controllers/users/loginUser.js';
import registerUser from '../controllers/users/registerUser.js';

import validateRegistration from '../middleware/validation/validateRegistration.js';

import passport from 'passport';
import jwt from 'jsonwebtoken';
import User from '../database/models/User.js';
import ServerError from '../utilities/errors/ServerError.js';

const router = express.Router();

router.route('/login').post(passport.authenticate('local'), loginUser);
router.route('/register').post(validateRegistration, registerUser);
router.route('/confirm/:userID/:token').get(async (req, res, next) => {
	try {
		const { userID, token } = req.params;

		const decoded = jwt.verify(token, 'this-should-be-a-better-secret');

		const userToConfirm = await User.findById(userID);
		if (userToConfirm.isAccountConfirmed === true) throw new ServerError('Account is already confirmed', 400);
		console.log(decoded);

		const decodedUser = await User.findById(decoded.id);

		if (!(decodedUser === userToConfirm)) throw new ServerError('Invalid link', 400);

		userToConfirm.isAccountConfirmed = true;

		console.log(decoded);
		await userToConfirm.save();

		res.json({ message: 'Account confirmed.' });
	} catch (error) {
		if (error.name === 'CastError') {
			next(new ServerError('Invalid user id detected. Unable to authenticate user.', 400));
		}
		next(error);
	}
});

export default router;
