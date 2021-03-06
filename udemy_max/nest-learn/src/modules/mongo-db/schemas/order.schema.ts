import { Schema, Document } from 'mongoose';
import { productSchema, Product } from './product.schema';
export const orderSchema = new Schema({
  products: [
    {
      product: { type: productSchema, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  user: {
    email: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
});

export interface Order extends Document {
  products: Array<{ product: Product; quantity: number }>;
  user: {
    userId: string;
    email: string;
  };
}
