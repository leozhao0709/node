import { Schema, Document } from 'mongoose';

export const productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
});

export interface Product extends Document {
  readonly title: string;
  readonly price: number;
  readonly description: string;
  readonly imageUrl: string;
  readonly userId: Schema.Types.ObjectId;
}
