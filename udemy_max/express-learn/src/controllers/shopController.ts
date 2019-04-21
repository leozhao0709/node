import { Request, Response, NextFunction, response } from 'express';
import { getAllProducts, getProductById } from '../services/productService';
import { addToCart, getCartData, deleteProductFromCart } from '../services/cartService';
import { Product } from '../models/product';

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  const products = await getAllProducts();
  res.render('shop/product-list.njk', {
    products,
    path: '/products'
  });
};

export const getProduct = (req: Request, res: Response, next) => {
  const productId = req.params.productId;
  const product = getProductById(productId);
  res.render('shop/product-detail.njk', {
    product,
    path: '/products'
  });
};

export const getIndex = (req: Request, res: Response, next) => {
  const products = getAllProducts();
  res.render('shop/index.njk', {
    products,
    path: '/'
  });
};

export const getCart = (req, res: Response, next) => {
  const cart = getCartData();
  if (cart) {
    const cartProdData: Array<{ product: Product; qty: number }> = [];
    cart.products.forEach(prod => {
      const product = getProductById(prod.productId);
      if (product) {
        cartProdData.push({ product, qty: prod.qty });
      }
    });
    res.render('shop/cart.njk', {
      path: '/cart',
      cartProdData
    });
  }
};

export const postCart = (req: Request, res: Response, next) => {
  const productId = req.body.productId;
  const product = getProductById(productId);
  if (product) {
    addToCart(product);
  }
  res.redirect('/cart');
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

export const postDeleteProductFormCart = async (req: Request, res: Response, next) => {
  const { productId } = req.body;
  const product = getProductById(productId);
  if (product) {
    await deleteProductFromCart(product);
  }
  res.redirect('/cart');
};
