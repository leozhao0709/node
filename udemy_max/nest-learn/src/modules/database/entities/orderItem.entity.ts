import { Entity, PrimaryColumn, ManyToOne, JoinColumn, Column } from 'typeorm';
import { Order } from './order.entity';
import { Product } from './product.entity';

/**
 * OrderItem
 */
@Entity()
export class OrderItem {
  @PrimaryColumn()
  orderId: number;

  @ManyToOne(() => Order, order => order.orderItems)
  @JoinColumn({ name: 'orderId' })
  order: Order;

  @PrimaryColumn()
  productId: number;

  @ManyToOne(() => Product, product => product.orderItems)
  @JoinColumn({ name: 'productId' })
  product: Product;

  @Column()
  quantity: number;
}
