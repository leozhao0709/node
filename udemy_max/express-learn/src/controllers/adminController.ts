import { Product } from '../models/product';
import { Request, Response, NextFunction } from 'express';
import {
  addProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProductById
} from '../services/productService';
import uuid from 'uuid';

export const getAddProduct = (req: Request, res: Response, next: NextFunction) => {
  res.render('admin/add-product.njk', {
    path: '/admin/add-product'
  });
};

export const postAddProduct = async (req: Request, res: Response, next: NextFunction) => {
  const { title, imageUrl, description, price } = req.body;
  const id = uuid();
  const product = new Product(id, title, imageUrl, description, price);
  await addProduct(product);
  res.redirect('/');
};

export const getEditProduct = (req: Request, res: Response, next) => {
  const productId = req.params.productId;
  const product = getProductById(productId);
  res.render('admin/edit-product.njk', { product });
};

export const postEditProduct = async (req: Request, res: Response, next) => {
  const { productId, imageUrl, title, price, description } = req.body;
  const product = getProductById(productId);
  if (product) {
    product.imageUrl = imageUrl;
    product.title = title;
    product.price = price;
    product.description = description;
    await updateProduct(product);
  }
  res.redirect('/admin/products');
};

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  const products = await getAllProducts();
  res.render('admin/products.njk', {
    products,
    path: '/admin/products'
  });
};

export const deleteProduct = async (req: Request, res: Response, next) => {
  const { productId } = req.body;
  await deleteProductById(productId);
  res.redirect('/admin/products');
};
