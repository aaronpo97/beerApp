import dotenv from 'dotenv';
import express from 'express';
import passport from 'passport';

/* ----- Controllers ----- */
import changeEmail from '../controllers/users/changeEmail';
import changeName from '../controllers/users/changeName';
import changeUsername from '../controllers/users/changeUsername';
import checkIfUserExists from '../controllers/users/checkIfUserExists';
import confirmUser from '../controllers/users/confirmUser';
import deleteUser from '../controllers/users/deleteUser';
import editUser from '../controllers/users/editUserInfo';
import loginUser from '../controllers/users/loginUser';
import registerUser from '../controllers/users/registerUser';
import requestPasswordReset from '../controllers/users/requestPasswordReset';
import resendConfirmation from '../controllers/users/resendConfirmation';
import resetPassword from '../controllers/users/resetPassword';
import sendVerifiedUserResponse from '../controllers/users/sendVerifiedUserResponse';
import viewProfile from '../controllers/users/viewProfile';
import viewUser from '../controllers/users/viewUser';

/* ----- Middleware ----- */
import canAccessUserInfo from '../middleware/auth/canAccessUserInfo';
import checkTokens from '../middleware/auth/checkTokens';
import isAccountConfirmed from '../middleware/auth/isAccountConfirmed';
import isAccountNotConfirmed from '../middleware/isAccountNotConfirmed';
import verifyAccessToken from '../middleware/auth/verifyAccessToken';

/* ----- Utilities ----- */
import ServerError from '../utilities/errors/ServerError';
import changePassword from '../controllers/users/changePassword';

dotenv.config();

const router = express.Router();

router
  .route('/verifytoken')
  .get(checkTokens, verifyAccessToken, sendVerifiedUserResponse)
  .all(() => {
    throw new ServerError('Not allowed.', 405);
  });

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

/* Password Reset and Change Password */
router
  .route('/help/requestpasswordreset')
  .post(requestPasswordReset)
  .all(() => {
    throw new ServerError('Not allowed.', 405);
  });

router
  .route('/resetpassword/:userId/:passwordResetToken')
  .put(resetPassword)
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
  .route('/:id/changepassword')
  .put(checkTokens, verifyAccessToken, canAccessUserInfo, changePassword)
  .all(() => {
    throw new ServerError('Not allowed.', 405);
  });

// unconfirmed users - change email
router
  .route('/:id/changeemail')
  .put(checkTokens, verifyAccessToken, isAccountNotConfirmed, changeEmail)
  .all(() => {
    throw new ServerError('Not allowed.', 405);
  });

// confirmed users - change email
router
  .route('/:id/updateemail')
  .put(checkTokens, verifyAccessToken, changeEmail)
  .all(() => {
    throw new ServerError('Not allowed.', 405);
  });

router
  .route('/:id/updateusername')
  .put(checkTokens, verifyAccessToken, isAccountConfirmed, changeUsername)
  .all(() => {
    throw new ServerError('Not allowed.', 405);
  });

router
  .route('/:id/updateName')
  .put(checkTokens, verifyAccessToken, isAccountConfirmed, changeName)
  .all(() => {
    throw new ServerError('Not Allowed', 405);
  });

/* View profile */
router
  .route('/profile/:id')
  .get(viewProfile)
  .all(() => {
    throw new ServerError('Not allowed.', 405);
  });

/* User confirmation */
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
