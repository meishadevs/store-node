import express from 'express';
import Product from '../controller/product';

const router = express.Router();

router.get('/list', Product.getPageList);

export default router;
