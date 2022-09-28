import express from 'express';
import Product from '../controller/product';

const router = express.Router();

router.get('/list', Product.getPageList);
router.get('/count', Product.getCount);

export default router;
