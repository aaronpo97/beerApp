import express from 'express';

import canAccessUserInfo from '../middleware/auth/canAccessUserInfo.js';
import verifyAccessToken from '../middleware/auth/verifyAccessToken.js';
import checkTokens from '../middleware/auth/checkTokens.js';
import isAccountConfirmed from '../middleware/auth/isAccountConfirmed.js';

import viewUser from '../controllers/users/viewUser.js';
import deleteUser from '../controllers/users/deleteUser.js';
import editUser from '../controllers/users/editUser.js';

import loginUser from '../controllers/users/loginUser.js';
import registerUser from '../controllers/users/registerUser.js';
import confirmUser from '../controllers/users/confirmUser.js';

import validateRegistration from '../middleware/validation/validateRegistration.js';

import passport from 'passport';
import dotenv from 'dotenv';
import ServerError from '../utilities/errors/ServerError.js';
import { SuccessResponse } from '../utilities/response/responses.js';
import User from '../database/models/User.js';

dotenv.config();
const router = express.Router();

router
	.route('/login')
	.post(passport.authenticate('local'), loginUser)
	.all(() => {
		throw new ServerError('Not allowed.', 405);
	});

router
	.route('/register')
	.post(validateRegistration, registerUser)
	.all(() => {
		throw new ServerError('Not allowed.', 405);
	});

router
	.route('/:id')
	.get(checkTokens, verifyAccessToken, isAccountConfirmed, canAccessUserInfo, viewUser)
	.put(checkTokens, verifyAccessToken, isAccountConfirmed, canAccessUserInfo, editUser)
	.delete(checkTokens, verifyAccessToken, canAccessUserInfo, deleteUser)
	.all(() => {
		throw new ServerError('Not allowed.', 405);
	});

const viewProfile = async (req, res, next) => {
	try {
		const { id } = req.params;
		const user = await User.findById(id);
		const { profile } = user;
		const status = 200;
		const payload = profile;
		res.json(
			new SuccessResponse(
				`Viewing the profile with the id of: ${user._id}`,
				status,
				payload,
				req.didTokenRegenerate ? req.accessToken : undefined
			)
		);
	} catch (error) {
		next(error);
	}
};

router
	.route('/profile/:id')
	.get(checkTokens, verifyAccessToken, isAccountConfirmed, viewProfile)
	.all(() => {
		throw new ServerError('Not allowed.', 405);
	});

router
	.route('/confirm/:userID/:token')
	.put(confirmUser)
	.all(() => {
		throw new ServerError('Not allowed.', 405);
	});

export default router;
