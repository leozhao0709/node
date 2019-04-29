import { Injectable } from '@nestjs/common';
import { Product } from '../../../database/entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartItem } from '../../../database/entities/cartItem.entity';
import { Cart } from '../../../database/entities/cart.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>,
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
  ) {}

  async addToCart(cart: Cart, product: Product) {
    const existingProductIndex = cart.cartItems.findIndex(
      cartItem => cartItem.productId === product.id,
    );

    if (existingProductIndex === -1) {
      // no existing product
      const newCartItem = new CartItem();
      newCartItem.quantity = 1;
      newCartItem.product = product;
      cart.cartItems.push(newCartItem);
      await this.cartRepository.save(cart);
    } else {
      // product already in cart
      cart.cartItems[existingProductIndex].quantity += 1;
      await this.cartItemRepository.save(cart.cartItems);
    }
  }

  async deleteProductFromCart(cart: Cart, product: Product) {
    const productInCart = cart.cartItems.some(
      cartItem => cartItem.productId === product.id,
    );
    if (productInCart) {
      cart.cartItems = cart.cartItems.filter(
        cartItem => cartItem.productId !== product.id,
      );
      // await this.cartItemRepository.save(cart.cartItems);
      await this.cartItemRepository.delete({ productId: product.id });
    }
  }
}
