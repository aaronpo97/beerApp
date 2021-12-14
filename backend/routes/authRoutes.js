import express from 'express';

import loginUser from '../controllers/auth/loginUser.js';
import logoutUser from '../controllers/auth/logoutUser.js';
import registerUser from '../controllers/auth/registerUser.js';

import passport from 'passport';

const router = express.Router();
router.route('/login').post(passport.authenticate('local'), loginUser);
router.route('/logout').post(logoutUser);
router.route('/register').post(registerUser);

export default router;
