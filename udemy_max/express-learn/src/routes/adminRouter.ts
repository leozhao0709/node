import { Router } from 'express';
import { postAddProduct, getAddProduct } from '../controllers/productController';

const adminRouter = Router();

adminRouter.get('/add-product', getAddProduct);

adminRouter.post('/add-product', postAddProduct);

export default adminRouter;
