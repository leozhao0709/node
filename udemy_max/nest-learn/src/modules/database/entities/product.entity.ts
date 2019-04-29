import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { User } from './user.entity';
import { CartItem } from './cartItem.entity';

/**
 * Product
 */
@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ length: 255 })
  productId: string;

  @Column({ length: 255 })
  title: string;

  @Column({ length: 255 })
  imageUrl: string;

  @Column('text')
  description: string;

  @Column('float')
  price: number;

  @ManyToOne(() => User, user => user.products, { onDelete: 'CASCADE' })
  user: User;

  @OneToMany(() => CartItem, cartItem => cartItem.product, { cascade: true })
  cartItems?: CartItem[];
}
