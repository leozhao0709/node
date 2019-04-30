import { Injectable } from '@nestjs/common';
import { Product } from '../../../database/entities/product.entity';
import { CartService } from '../cart/cart.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../database/entities/user.entity';

@Injectable()
export class ProductService {
  user: User;

  constructor(
    private readonly cartService: CartService,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  getProductById(productId: string) {
    return this.user.products.find(product => product.productId === productId);
  }

  async addProduct(product: Product) {
    await this.productRepository.insert(product);
    this.user.products.push(product);
  }

  async updateProduct(product: Product) {
    const existingProductindex = this.user.products!.findIndex(
      prod => prod.productId === product.productId,
    );

    if (existingProductindex !== -1) {
      await this.productRepository.update(
        { productId: product.productId },
        product,
      );
      this.user.products[existingProductindex] = product;
    } else {
      throw new Error(`product ${product} doesn't exist during update`);
    }
  }

  async deleteProductByProductId(productId: string) {
    const product = this.getProductById(productId);
    if (product) {
      await this.productRepository.delete({ productId });
      this.cartService.deleteProductFromCart(product);
      this.user.products = this.user.products.filter(
        prod => prod.productId !== productId,
      );
    } else {
      throw new Error(`product ${product} doesn't exist during delete`);
    }
  }
}
