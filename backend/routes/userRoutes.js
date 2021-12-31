import express from 'express';

import viewUser from '../controllers/users/viewUser.js';

import canAccessUserInfo from '../middleware/auth/canAccessUserInfo.js';
import verifyJWT from '../middleware/auth/verifyAccessToken.js';

import deleteUser from '../controllers/users/deleteUser.js';
import editUser from '../controllers/users/editUser.js';

const router = express.Router();

router
	.route('/:id')
	.get(verifyJWT, canAccessUserInfo, viewUser)
	.delete(verifyJWT, canAccessUserInfo, deleteUser)
	.put(verifyJWT, canAccessUserInfo, editUser);

export default router;
