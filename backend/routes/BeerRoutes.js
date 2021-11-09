import express from 'express';
import getAllPosts from '../controllers/posts/getAllPosts.js';
import showSpecificPost from '../controllers/posts/showSpecificPost.js';
import createBeerPost from '../controllers/posts/createBeerPost.js';
const router = express.Router();

router.route('/').get(getAllPosts).post(createBeerPost);
router.route('/:id').get(showSpecificPost);

export default router;
