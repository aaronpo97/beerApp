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
import viewProfile from '../controllers/users/viewProfile.js';

import validateRegistration from '../middleware/validation/validateRegistration.js';

import passport from 'passport';
import dotenv from 'dotenv';
import ServerError from '../utilities/errors/ServerError.js';
import User from '../database/models/User.js';
import { SuccessResponse } from '../utilities/response/responses.js';

dotenv.config();
const router = express.Router();

router
	.route('/doesuserexist')
	.get(async (req, res, next) => {
		try {
			const { username = '', email = '' } = req.query;

			if (!(username || email)) throw new ServerError('Missing necessary query parameters for GET /doesUserExist', 400);
			const doesUsernameExist = await User.findOne({ username });
			const doesEmailExist = await User.findOne({ email });

			const payload = {
				usernameExists: username ? !!doesUsernameExist : undefined,
				emailExists: email ? !!doesEmailExist : undefined,
			};

			res.json(new SuccessResponse(undefined, 200, payload, undefined));
		} catch (error) {
			next(error);
		}
	})
	.all(() => {
		throw new ServerError('Not allowed.', 405);
	});

router
	.route('/login')
	.post(passport.authenticate('local'), loginUser)
	.all(() => {
		throw new ServerError('Not allowed.', 405);
	});

router
	.route('/register')
	.post(registerUser)
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
