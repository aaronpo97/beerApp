import express from 'express';
import registerUser from '../controllers/users/registerUser.js';

const router = express.Router();

router.route('/').post(registerUser);

export default router;
