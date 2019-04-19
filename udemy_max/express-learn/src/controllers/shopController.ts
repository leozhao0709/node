import { Request, Response, NextFunction, response } from 'express';
import { getAllProducts } from '../services/productService';

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  const products = await getAllProducts();
  res.render('shop/product-list.njk', {
    products,
    path: '/products'
  });
};

export const getProduct = (req: Request, res: Response, next) => {
  console.log(req.params.productId);
  res.redirect('/');
};

export const getIndex = async (req: Request, res: Response, next) => {
  const products = await getAllProducts();
  res.render('shop/index.njk', {
    products,
    path: '/'
  });
};

export const getCart = (req, res: Response, next) => {
  res.render('shop/cart.njk', {
    path: '/cart'
  });
};

export const getOrders = (req, res: Response, next) => {
  res.render('shop/orders.njk', {
    path: '/orders'
  });
};

export const getCheckout = (req, res: Response, next) => {
  res.render('shop/checkout.njk', {
    path: '/checkout'
  });
};
