import { Router } from 'express';
import { getProduct } from '../controllers/productController';

const shopRouter = Router();

shopRouter.get('/', getProduct);

export default shopRouter;
