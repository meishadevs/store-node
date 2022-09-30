import express from 'express';
import Advisory from '../controller/Advisory';

const router = express.Router();

router.get('/list', Advisory.getPageList);

export default router;
