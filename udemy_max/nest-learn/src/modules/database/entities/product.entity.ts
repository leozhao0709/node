import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
}
