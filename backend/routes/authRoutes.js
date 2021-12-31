import express from 'express';

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

export default router;
