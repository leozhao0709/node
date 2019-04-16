import { Router } from 'express';
import { product } from './adminRouter';

const shopRouter = Router();

shopRouter.get('/', (req, res, next) => {
  res.render('shop.html', { product });
});

export default shopRouter;
