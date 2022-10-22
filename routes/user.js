import express from 'express';
import User from '../controller/user';

const router = express.Router();

router.post('/login', User.login);
router.post('/register', User.register);
router.get('/logout', User.logout);
router.get('/all', User.getAllUser);
router.get('/count', User.getUserCount);
router.get('/info', User.getUserInfo);

export default router;
