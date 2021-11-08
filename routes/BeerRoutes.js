import express from 'express';
import getAllPosts from '../controllers/getAllPosts.js';
const router = express.Router();

router.route('/').get(getAllPosts);

export default router;
