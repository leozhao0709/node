import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';

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
}
