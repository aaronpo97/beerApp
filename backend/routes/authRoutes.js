import express from 'express';

import loginUser from '../controllers/users/loginUser.js';
import registerUser from '../controllers/users/registerUser.js';

import validateRegistration from '../middleware/validation/validateRegistration.js';

import passport from 'passport';

const router = express.Router();

router.route('/login').post(passport.authenticate('local'), loginUser);
router.route('/register').post(validateRegistration, registerUser);

export default router;
