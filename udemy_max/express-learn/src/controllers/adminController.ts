import { Product } from '../models/product';
import { Request, Response, NextFunction } from 'express';
import { addProduct, getAllProducts } from '../services/productService';
import uuid from 'uuid';

export const getAddProduct = (req: Request, res: Response, next: NextFunction) => {
  res.render('admin/add-product.njk', {
    pageTitle: 'Add Product',
    path: '/admin/add-product'
  });
};

export const postAddProduct = async (req: Request, res: Response, next: NextFunction) => {
  const { title, imageUrl, description, price } = req.body;
  const id = uuid();
  const product = new Product(id, title, imageUrl, description, price);
  addProduct(product);
  res.redirect('/');
};

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  const products = await getAllProducts();
  res.render('admin/products.njk', {
    products,
    path: '/products'
  });
};
