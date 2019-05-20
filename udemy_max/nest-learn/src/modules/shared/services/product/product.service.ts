import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema } from 'mongoose';
import { Product } from '../../../mongo-db/schemas/product.schema';
import { CreateProductDto } from '../../../../dto/product/create-product.dto';
import { ProductDto } from '../../../../dto/product/product.dto';
import { UserService } from '../user/user.service';
import { User } from '../../../mongo-db/schemas/user.schema';
import { UserNotHavePermissionException } from '../../../../exceptions/user/userNotHavePermissionException';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
    private readonly userService: UserService,
  ) {}

  async getAllProductsByUserId(userId: string) {
    return await this.productModel
      .find({
        userId,
      })
      .exec();
  }

  async getAllProducts() {
    return await this.productModel.find().exec();
  }

  async getProductById(productId: string) {
    return await this.productModel.findById(productId).exec();
  }

  async createProduct(
    user: User,
    product: CreateProductDto,
    uploadedImage: Express.Multer.File,
  ) {
    await this.productModel.create({
      ...product,
      imageUrl: uploadedImage.path,
      userId: user.id,
    });
  }

  async updateProduct(
    user: User,
    productDto: ProductDto,
    image: Express.Multer.File,
  ) {
    const product = await this.productModel.findById(productDto.id);
    if (user.id !== product.userId.toString()) {
      throw new UserNotHavePermissionException();
    }

    let newProduct = productDto;
    if (image) {
      newProduct = {
        ...productDto,
        imageUrl: image.path,
      };
    }

    return await this.productModel
      .findByIdAndUpdate(product.id, newProduct)
      .exec();
  }

  async deleteProductByProductId(user: User, productId: string) {
    const product = await this.productModel.findById(productId);
    if (user.id !== product.userId) {
      throw new UserNotHavePermissionException();
    }

    return await this.productModel.findByIdAndRemove(productId).exec();
  }
}
