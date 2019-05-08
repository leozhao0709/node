import { Schema, Document } from 'mongoose';

export const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cart: {
    type: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: 'Product',
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    default: [],
  },
});

export interface User extends Document {
  email: string;
  password: string;
  cart: Array<{ productId: string; quantity: number }>;
}
