import { Router } from 'express';

const adminRouter = Router();
export const product: Array<{ title: string }> = [];

adminRouter.get('/add-product', (req, res, next) => {
  res.render('add-product.html');
});

adminRouter.post('/product', (req, res) => {
  product.push(req.body);
  res.redirect('/');
});

export default adminRouter;
