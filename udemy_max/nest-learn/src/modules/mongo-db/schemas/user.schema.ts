import { Schema, Document } from 'mongoose';

export const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  cart: [
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
});

export interface User extends Document {
  name: string;
  email: string;
  cart: Array<{ productId: string; quantity: number }>;
  test: () => void;
}
