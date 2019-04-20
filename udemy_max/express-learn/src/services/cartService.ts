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

  // write to file
  if (!fs.existsSync(path.resolve(cartFile, '..'))) {
    fs.mkdirSync(path.resolve(cartFile, '..'), { recursive: true });
  }

  await fs.promises.writeFile(cartFile, JSON.stringify(cart));
};
