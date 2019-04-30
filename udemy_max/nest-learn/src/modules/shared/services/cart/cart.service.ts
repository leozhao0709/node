import { Injectable } from '@nestjs/common';
import { Product } from '../../../database/entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartItem } from '../../../database/entities/cartItem.entity';
import { Cart } from '../../../database/entities/cart.entity';

@Injectable()
export class CartService {
  cart: Cart;

  constructor(
    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>,
  ) {}

  async addToCart(product: Product) {
    const existingProductIndex = this.cart.cartItems.findIndex(
      cartItem => cartItem.productId === product.id,
    );

    if (existingProductIndex === -1) {
      // no existing product
      const newCartItem = this.cartItemRepository.create();
      newCartItem.quantity = 1;
      newCartItem.product = product;
      newCartItem.cart = this.cart;

      this.cart.cartItems.push(newCartItem);
      await this.cartItemRepository.save(newCartItem);
    } else {
      // product already in cart
      this.cart.cartItems[existingProductIndex].quantity += 1;
      await this.cartItemRepository.save(this.cart.cartItems);
    }
  }

  async deleteProductFromCart(product: Product) {
    const productInCart = this.cart.cartItems.some(
      cartItem => cartItem.productId === product.id,
    );
    if (productInCart) {
      this.cart.cartItems = this.cart.cartItems.filter(
        cartItem => cartItem.productId !== product.id,
      );
      await this.cartItemRepository.delete({ productId: product.id });
    }
  }
}
