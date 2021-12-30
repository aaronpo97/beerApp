import express from 'express';

import getAllPosts from '../controllers/posts/getAllPosts.js';
import showBeerPost from '../controllers/posts/showBeerPost.js';
import createBeerPost from '../controllers/posts/createBeerPost.js';
import deleteBeerPost from '../controllers/posts/deleteBeerPost.js';
import updateBeerPost from '../controllers/posts/updateBeerPost.js';

import validateBeerPost from '../middleware/validation/validateBeerPost.js';
import verifyJWT from '../middleware/auth/verifyJWT.js';
import isPostOwner from '../middleware/auth/isPostOwner.js';
import checkToken from './checkToken.js';

const router = express.Router();

router
	.route('/')
	.get(checkToken, verifyJWT, getAllPosts)
	.post(verifyJWT, validateBeerPost, createBeerPost);

router
	.route('/:id')
	.get(verifyJWT, showBeerPost)
	.delete(verifyJWT, isPostOwner, deleteBeerPost)
	.put(verifyJWT, isPostOwner, updateBeerPost);

export default router;
