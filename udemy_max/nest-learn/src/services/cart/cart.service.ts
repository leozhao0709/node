import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import { Product } from '../../models/product';
import { Cart } from '../../models/cart';

@Injectable()
export class CartService {
  private cartFile = path.resolve(
    process.mainModule!.filename,
    '../data/cart.json',
  );

  private cart: Cart;

  constructor() {
    this.fetchCart().then(cart => (this.cart = cart));
  }

  /**
   * Getter $cart
   * @return {Cart}
   */
  public get $cart(): Cart {
    return this.cart;
  }

  private async fetchCart() {
    try {
      const content = await fs.promises.readFile(this.cartFile);
      return JSON.parse(content.toString()) as Cart;
    } catch (error) {
      return new Cart([], 0);
    }
  }

  private async saveCartToFile() {
    if (!fs.existsSync(path.resolve(this.cartFile, '..'))) {
      fs.mkdirSync(path.resolve(this.cartFile, '..'), { recursive: true });
    }
    try {
      await fs.promises.writeFile(this.cartFile, JSON.stringify(this.cart));
    } catch (error) {
      // tslint:disable-next-line: no-console
      console.log(error);
    }
  }

  async addToCart(product: Product) {
    const exsitingProductIndex = this.cart!.products.findIndex(
      productInCart => productInCart.productId === product.id,
    );

    if (exsitingProductIndex === -1) {
      // new product add to cart
      this.cart.products = [
        ...this.cart.products,
        { productId: product.id, qty: 1 },
      ];
    } else {
      // existing product add to cart
      this.cart.products[exsitingProductIndex].qty += 1;
    }
    this.cart.totalPrice = +(this.cart!.totalPrice + +product.price).toFixed(2);

    await this.saveCartToFile();
  }

  async deleteProductFromCart(product: Product) {
    const cartProd = this.cart.products.find(
      prod => prod.productId === product.id,
    );
    if (cartProd) {
      const cartProdQty = cartProd.qty;
      this.cart.products = this.cart.products.filter(
        prod => prod.productId !== product.id,
      );
      this.cart.totalPrice = +(
        this.cart.totalPrice -
        product.price * cartProdQty
      ).toFixed(2);
      await this.saveCartToFile();
    }
  }
}
