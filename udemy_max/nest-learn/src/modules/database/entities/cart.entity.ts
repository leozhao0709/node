import {
  PrimaryGeneratedColumn,
  Entity,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import { User } from './user.entity';
import { CartItem } from './cartItem.entity';

/**
 * Cart
 */
@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id?: number;

  @OneToOne(() => User, user => user.cart, { cascade: true })
  @JoinColumn()
  user: User;

  @OneToMany(() => CartItem, cartItem => cartItem.cart, { cascade: true })
  cartItems: CartItem[];
}
