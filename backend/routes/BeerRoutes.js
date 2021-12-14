import express from 'express';

import getAllPosts from '../controllers/posts/getAllPosts.js';
import showBeerPost from '../controllers/posts/showBeerPost.js';
import createBeerPost from '../controllers/posts/createBeerPost.js';
import deleteBeerPost from '../controllers/posts/deleteBeerPost.js';
import updateBeerPost from '../controllers/posts/updateBeerPost.js';

import validateBeerPost from '../middleware/validation/validateBeerPost.js';
import verifyJWT from '../middleware/auth/verifyJWT.js';
import BeerPost from '../database/models/BeerPost.js';
import ServerError from '../utilities/ServerError.js';
import User from '../database/models/User.js';

const isPostOwner = async (req, res, next) => {
	try {
		const { id } = req.params;
		const post = await BeerPost.findById(id);
		if (!post) throw new ServerError('Cannot find a post with that id', 404);
		const author = await User.findById(post.author.toString());

		if (author !== req.currentUser) {
			throw new ServerError('You are not authorized to do that.', 403);
		}
		next();
	} catch (error) {
		next(error);
	}
};

const router = express.Router();

router
	.route('/')
	.get(verifyJWT, getAllPosts)
	.post(verifyJWT, validateBeerPost, createBeerPost);
router
	.route('/:id')
	.get(verifyJWT, showBeerPost)
	.delete(verifyJWT, isPostOwner, deleteBeerPost)
	.put(verifyJWT, isPostOwner, updateBeerPost);

export default router;
