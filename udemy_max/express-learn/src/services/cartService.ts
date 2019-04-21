import fs from 'fs';
import path, { dirname } from 'path';
import { Cart } from '../models/cart';
import { Product } from '../models/product';

const cartFile = path.resolve(process.mainModule!.filename, '../data/cart.json');

let cart: Cart | undefined;

const fetchCart = async (): Promise<Cart> => {
  try {
    const content = await fs.promises.readFile(cartFile);
    return JSON.parse(content.toString());
  } catch (error) {
    return new Cart([], 0);
  }
};

const saveCartToFile = async () => {
  if (!fs.existsSync(path.resolve(cartFile, '..'))) {
    fs.mkdirSync(path.resolve(cartFile, '..'), { recursive: true });
  }
  try {
    await fs.promises.writeFile(cartFile, JSON.stringify(cart));
  } catch (error) {
    // tslint:disable-next-line: no-console
    console.log(error);
  }
};

(async () => {
  if (!cart) {
    cart = await fetchCart();
  }
  return cart;
})();

export const addToCart = async (product: Product) => {
  const exsitingProductIndex = cart!.products.findIndex(productInCart => productInCart.productId === product.id);

  if (exsitingProductIndex === -1) {
    // new product add to cart
    cart!.products = [...cart!.products, { productId: product.id, qty: 1 }];
  } else {
    // existing product add to cart
    cart!.products[exsitingProductIndex].qty += 1;
  }
  cart!.totalPrice += +product.price;

  await saveCartToFile();
};

export const deleteProductFromCart = async (product: Product) => {
  const cartProd = cart!.products.find(prod => prod.productId === product.id);
  if (cartProd) {
    const cartProdQty = cartProd.qty;
    cart!.products = cart!.products.filter(prod => prod.productId !== product.id);
    cart!.totalPrice -= product.price * cartProdQty;
    await saveCartToFile();
  }
};
