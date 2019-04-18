import { Product } from '../models/product';
import { Request, Response, NextFunction } from 'express';
import { saveProduct, fetchAllProducts } from '../services/productService';

export const getAddProduct = (req: Request, res: Response, next: NextFunction) => {
  res.render('admin/add-product.njk', {
    pageTitle: 'Add Product',
    path: '/admin/add-product'
  });
};

export const postAddProduct = async (req: Request, res: Response, next: NextFunction) => {
  const { title, imageUrl, description, price } = req.body;
  const product = new Product(title, imageUrl, description, price);
  // saveProduct(product).then(() => res.redirect('/'));
  await saveProduct(product);
  res.redirect('/');
};

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  // fetchAllProducts().then(products => {
  //   res.render('shop.njk', {
  //     products,
  //     path: '/'
  //   });
  // });
  const products = await fetchAllProducts();
  res.render('admin/products.njk', {
    products,
    path: '/products'
  });
};
