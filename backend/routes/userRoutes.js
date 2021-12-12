import express from 'express';

import viewUser from '../controllers/users/viewUser.js';

import isUserAuthorized from '../middleware/auth/isUserAuthorized.js';
import verifyJWT from '../middleware/auth/verifyJWT.js';

import deleteUser from '../controllers/users/deleteUser.js';
import editUser from '../controllers/users/editUser.js';

const router = express.Router();

router
	.route('/:id')
	.get(verifyJWT, isUserAuthorized, viewUser)
	.delete(verifyJWT, isUserAuthorized, deleteUser)
	.put(verifyJWT, isUserAuthorized, editUser);

export default router;
