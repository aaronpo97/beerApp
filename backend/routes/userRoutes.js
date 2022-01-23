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

import { SuccessResponse } from '../utilities/response/responses.js';

import ServerError from '../utilities/errors/ServerError.js';
import checkIfUserExists from '../controllers/users/checkIfUserExists.js';

import passport from 'passport';
import dotenv from 'dotenv';
dotenv.config();

import resendConfirmation from '../controllers/users/resendConfirmation.js';

const router = express.Router();

router.route('/verifytoken').get(checkTokens, verifyAccessToken, async (req, res) => {
   const { currentUser } = req;

   const payload = await currentUser.populate({
      path: 'profile',
      populate: { path: 'displayImage', model: 'Image' },
   });
   res.json(
      new SuccessResponse(
         `Successfully verified ${req.currentUser.username}.`,
         200,
         payload,
         req.didTokenRegenerate ? req.accessToken : undefined
      )
   );
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

router
   .route('/:id')
   .get(checkTokens, verifyAccessToken, isAccountConfirmed, canAccessUserInfo, viewUser)
   .put(checkTokens, verifyAccessToken, isAccountConfirmed, canAccessUserInfo, editUser)
   .delete(checkTokens, verifyAccessToken, isAccountConfirmed, canAccessUserInfo, deleteUser)
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
