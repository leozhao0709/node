import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Product } from './product.entity';
import { Cart } from './cart.entity';

/**
 * User
 */
@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id?: number;
  @Column()
  email: string;
  @Column()
  name: string;

  @OneToMany(() => Product, product => product.user, { cascade: true })
  products: Product[];

  @OneToOne(() => Cart, cart => cart.user, { cascade: true })
  cart: Cart;
}
