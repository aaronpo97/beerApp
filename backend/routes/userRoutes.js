import express from 'express';

import viewUser from '../controllers/users/viewUser.js';

import canAccessUserInfo from '../middleware/auth/canAccessUserInfo.js';
import verifyAccessToken from '../middleware/auth/verifyAccessToken.js';

import deleteUser from '../controllers/users/deleteUser.js';
import editUser from '../controllers/users/editUser.js';
import checkTokens from '../middleware/auth/checkTokens.js';

import loginUser from '../controllers/users/loginUser.js';
import registerUser from '../controllers/users/registerUser.js';
import confirmUser from '../controllers/users/confirmUser.js';

import validateRegistration from '../middleware/validation/validateRegistration.js';

import passport from 'passport';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

router
	.route('/login')
	.get(() => {
		throw new ServerError('Not allowed.', 405);
	})
	.post(passport.authenticate('local'), loginUser);

router
	.route('/register')
	.get(() => {
		throw new ServerError('Not allowed.', 405);
	})
	.post(validateRegistration, registerUser);

router
	.route('/:id')
	.get(checkTokens, verifyAccessToken, canAccessUserInfo, viewUser)
	.delete(checkTokens, verifyAccessToken, canAccessUserInfo, deleteUser)
	.put(checkTokens, verifyAccessToken, canAccessUserInfo, editUser)
	.post(() => {
		throw new ServerError('Not allowed.', 405);
	});

export default router;
