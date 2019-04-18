import { Router } from 'express';
import { getProducts, getIndex, getCart, getCheckout, getOrders } from '../controllers/shopController';

const shopRouter = Router();

shopRouter.get('/', getIndex);

shopRouter.get('/products', getProducts);

shopRouter.get('/cart', getCart);

shopRouter.get('/orders', getOrders);

shopRouter.get('/checkout', getCheckout);

export default shopRouter;
