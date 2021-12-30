import express from 'express';

import loginUser from '../controllers/users/loginUser.js';
import registerUser from '../controllers/users/registerUser.js';
import confirmUser from '../controllers/users/confirmUser.js';

import validateRegistration from '../middleware/validation/validateRegistration.js';

import passport from 'passport';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

router.route('/login').post(passport.authenticate('local'), loginUser);
router.route('/register').post(validateRegistration, registerUser);
router.route('/confirm/:userID/:token').get(confirmUser);

export default router;
