import express from 'express';
import loginUser from '../controllers/users/loginUser.js';

const router = express.Router();

router.route('/').post(loginUser);

export default router;
