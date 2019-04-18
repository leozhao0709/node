import { Request, Response, NextFunction, response } from 'express';
import { fetchAllProducts } from '../services/productService';

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  // fetchAllProducts().then(products => {
  //   res.render('shop.njk', {
  //     products,
  //     path: '/'
  //   });
  // });
  const products = await fetchAllProducts();
  res.render('shop/product-list.njk', {
    products,
    path: '/products'
  });
};

export const getIndex = async (req: Request, res: Response, next) => {
  const products = await fetchAllProducts();
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
