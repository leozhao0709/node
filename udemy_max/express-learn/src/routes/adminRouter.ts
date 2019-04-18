import { Router } from 'express';
import { getAddProduct, postAddProduct, getProducts } from '../controllers/adminController';

const adminRouter = Router();

adminRouter.get('/add-product', getAddProduct);

// /admin/add-product
adminRouter.post('/add-product', postAddProduct);

adminRouter.get('/products', getProducts);

export default adminRouter;
