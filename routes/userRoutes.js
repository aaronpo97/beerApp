import express from 'express';

import dotenv from 'dotenv';
import passport from 'passport';

// ----- Controllers ----- //
import viewUser from '../controllers/users/viewUser.js';
import deleteUser from '../controllers/users/deleteUser.js';
import editUser from '../controllers/users/editUser.js';
import loginUser from '../controllers/users/loginUser.js';
import registerUser from '../controllers/users/registerUser.js';
import confirmUser from '../controllers/users/confirmUser.js';
import viewProfile from '../controllers/users/viewProfile.js';
import checkIfUserExists from '../controllers/users/checkIfUserExists.js';
import resendConfirmation from '../controllers/users/resendConfirmation.js';
import changeEmail from '../controllers/users/changeEmail.js';
import sendVerifiedUserResponse from '../controllers/users/sendVerifiedUserResponse.js';
// ----- Middleware ----- //
import canAccessUserInfo from '../middleware/auth/canAccessUserInfo.js';
import verifyAccessToken from '../middleware/auth/verifyAccessToken.js';
import checkTokens from '../middleware/auth/checkTokens.js';
import isAccountConfirmed from '../middleware/auth/isAccountConfirmed.js';

// ----- Utilities ------ //
import ServerError from '../utilities/errors/ServerError.js';
import isAccountNotConfirmed from './isAccountNotConfirmed.js';

dotenv.config();

const router = express.Router();

router.route('/verifytoken').get(checkTokens, verifyAccessToken, sendVerifiedUserResponse);

router
  .route('/checkifuserexists')
  .get(checkIfUserExists)
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
  .delete(checkTokens, verifyAccessToken, isAccountConfirmed, canAccessUserInfo, deleteUser)
  .all(() => {
    throw new ServerError('Not allowed.', 405);
  });

router
  .route('/:id/changeemail')
  .put(checkTokens, verifyAccessToken, isAccountNotConfirmed, changeEmail)
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
  .route('/confirm/resend-confirmation-email')
  .get(checkTokens, verifyAccessToken, resendConfirmation)
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
