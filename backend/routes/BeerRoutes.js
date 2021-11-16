import express from 'express';
import getAllPosts from '../controllers/posts/getAllPosts.js';
import showBeerPost from '../controllers/posts/showBeerPost.js';
import createBeerPost from '../controllers/posts/createBeerPost.js';
import deleteBeerPost from '../controllers/posts/deleteBeerPost.js';

const router = express.Router();

router.route('/').get(getAllPosts).post(createBeerPost);
router.route('/:id').get(showBeerPost).delete(deleteBeerPost);

export default router;
