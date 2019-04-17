import { Request, Response, NextFunction } from 'express';
import { Product } from '../models/product';
import { fetchAllProducts, saveProduct } from '../services/productService';

export const getAddProduct = (req: Request, res: Response, next: NextFunction) => {
  res.render('add-product.njk', {
    pageTitle: 'Add Product',
    path: '/admin/add-product'
  });
};

export const postAddProduct = async (req: Request, res: Response, next: NextFunction) => {
  const product = new Product(req.body.title);
  // saveProduct(product).then(() => res.redirect('/'));
  await saveProduct(product);
  res.redirect('/');
};

export const getProduct = async (req: Request, res: Response, next: NextFunction) => {
  // fetchAllProducts().then(products => {
  //   res.render('shop.njk', {
  //     products,
  //     path: '/'
  //   });
  // });
  const products = await fetchAllProducts();
  res.render('shop.njk', {
    products,
    path: '/'
  });
};
