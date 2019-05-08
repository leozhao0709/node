import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from '../../../mongo-db/schemas/product.schema';
import { CreateProductDto } from '../../../../dto/product/create-product.dto';
import { ProductDto } from '../../../../dto/product/product.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
    private readonly userService: UserService,
  ) {}

  async getAllProducts() {
    return await this.productModel.find().exec();
  }

  async getProductById(productId: string) {
    return await this.productModel.findById(productId).exec();
  }

  async createProduct(product: CreateProductDto) {
    await this.productModel.create({
      ...product,
      userId: this.userService.getCurrentUser().id,
    });
  }

  async updateProduct(product: ProductDto) {
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
