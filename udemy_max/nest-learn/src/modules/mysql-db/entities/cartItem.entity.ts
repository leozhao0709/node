import { Cart } from './cart.entity';
import { Product } from './product.entity';
import {
  Column,
  ManyToOne,
  Entity,
  PrimaryColumn,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
/**
 * CartItem
 */
@Entity()
export class CartItem {
  @PrimaryGeneratedColumn()
  id?: number;

  @PrimaryColumn()
  cartId: number;

  @ManyToOne(() => Cart, cart => cart.cartItems)
  @JoinColumn({ name: 'cartId' })
  cart: Cart;

  @PrimaryColumn()
  productId: number;

  @ManyToOne(() => Product, product => product.cartItems)
  @JoinColumn({ name: 'productId' })
  product: Product;

  @Column()
  quantity: number;
}
