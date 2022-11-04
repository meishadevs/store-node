import express from 'express';
import Menu from '../controller/menu';

const router = express.Router();

router.get('/list', Menu.getList);

export default router;
