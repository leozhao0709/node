import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from '../../../mongo-db/schemas/product.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async getProductById(productId: string) {
    return await this.productModel.findById(productId).exec();
  }

  async addProduct(product: Product) {
    await this.productModel.create(product);
  }

  async updateProduct(product: Product) {
    try {
      await this.productModel.findByIdAndUpdate(product.id, product).exec();
    } catch (error) {
      throw error;
    }
  }

  async deleteProductByProductId(productId: string) {
    return await this.productModel.findByIdAndRemove(productId).exec();
  }
}
