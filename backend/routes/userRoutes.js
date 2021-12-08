import express from 'express';
import jwt from 'jsonwebtoken';
import viewUser from '../controllers/users/viewUser.js';

import isUserAuthorized from '../middleware/auth/isUserAuthorized.js';
import verifyJWT from '../middleware/auth/verifyJWT.js';
import User from '../database/models/User.js';

const router = express.Router();

const deleteUser = async (req, res, next) => {
	try {
		req.currentUser.delete();
	} catch (error) {
		next(error);
	}
};

router
	.route('/:id')
	.get(verifyJWT, isUserAuthorized, viewUser)
	.delete(verifyJWT, isUserAuthorized, deleteUser);

export default router;
