import { Router } from 'express';
import {
  getProducts,
  getIndex,
  getCart,
  getCheckout,
  getOrders,
  getProduct,
  postCart
} from '../controllers/shopController';

const shopRouter = Router();

shopRouter.get('/', getIndex);

shopRouter.get('/products', getProducts);
shopRouter.get('/products/:productId', getProduct);

shopRouter.get('/cart', getCart);
shopRouter.post('/cart', postCart);

shopRouter.get('/orders', getOrders);

shopRouter.get('/checkout', getCheckout);

export default shopRouter;
