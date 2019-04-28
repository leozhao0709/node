import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Product } from './product.entity';

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

  @OneToMany(() => Product, product => product.user)
  products: Product[];
}
