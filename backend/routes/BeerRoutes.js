import express from 'express';

import getAllPosts from '../controllers/posts/getAllPosts.js';
import showBeerPost from '../controllers/posts/showBeerPost.js';
import createBeerPost from '../controllers/posts/createBeerPost.js';
import deleteBeerPost from '../controllers/posts/deleteBeerPost.js';
import updateBeerPost from '../controllers/posts/updateBeerPost.js';

import validateBeerPost from '../middleware/validation/validateBeerPost.js';

const router = express.Router();

router.route('/').get(getAllPosts).post(validateBeerPost, createBeerPost);
router.route('/:id').get(showBeerPost).delete(deleteBeerPost).put(updateBeerPost);

export default router;
