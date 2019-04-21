import { Router } from 'express';
import {
  getAddProduct,
  postAddProduct,
  getProducts,
  getEditProduct,
  postEditProduct,
  deleteProduct
} from '../controllers/adminController';

const adminRouter = Router();

adminRouter.get('/add-product', getAddProduct);

// /admin/add-product
adminRouter.post('/add-product', postAddProduct);

adminRouter.get('/products', getProducts);

adminRouter.get('/edit-product/:productId', getEditProduct);
adminRouter.post('/edit-product', postEditProduct);

adminRouter.post('/delte-product', deleteProduct);

export default adminRouter;
