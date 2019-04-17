import { Request, Response, NextFunction } from 'express';
import { Product } from '../models/product';

const products: Product[] = [];

export const getAddProduct = (req: Request, res: Response, next: NextFunction) => {
  res.render('add-product.njk', {
    pageTitle: 'Add Product',
    path: '/admin/add-product'
  });
};

export const postAddProduct = (req: Request, res: Response, next: NextFunction) => {
  const product = new Product(req.body.title);
  products.push(product);
  res.redirect('/');
};

export const getProduct = (req: Request, res: Response, next: NextFunction) => {
  console.log(process.mainModule!);
  res.render('shop.njk', {
    products,
    path: '/'
  });
};
