'use strict';

import express from 'express'
import User from '../controller/user'
const router = express.Router()

router.post('/login', User.login);
router.get('/signout', User.singout);
router.get('/all', User.getAllUser);
router.get('/count', User.getUserCount);
router.get('/info', User.getUserInfo);
router.post('/update/avatar/:user_id', User.updateAvatar);

export default router
