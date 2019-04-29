import { Injectable } from '@nestjs/common';
import { Product } from '../../../database/entities/product.entity';
import { CartService } from '../cart/cart.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../database/entities/user.entity';

@Injectable()
export class ShopService {
  private products: Product[];

  /**
   * Getter $products
   * @return {Product[]}
   */
  public get $products(): Product[] {
    return this.products;
  }

  constructor(
    private readonly cartService: CartService,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {
    this.fetchAllProducts().then(prods => (this.products = prods));
  }

  private async fetchAllProducts(): Promise<Product[]> {
    try {
      return await this.productRepository.find();
    } catch (error) {
      return [];
    }
  }

  getProductById(productId: string) {
    return this.products.find(product => product.productId === productId);
  }

  async addProduct(product: Product) {
    await this.productRepository.insert(product);
    this.products.push(product);
  }

  async updateProduct(product: Product) {
    const existingProductindex = this.products!.findIndex(
      prod => prod.productId === product.productId,
    );

    if (existingProductindex !== -1) {
      await this.productRepository.update(
        { productId: product.productId },
        product,
      );
      this.products[existingProductindex] = product;
    } else {
      throw new Error(`product ${product} doesn't exist during update`);
    }
  }

  async deleteProductByProductId(user: User, productId: string) {
    const product = this.getProductById(productId);
    if (product) {
      await this.productRepository.delete({ productId });
      this.cartService.deleteProductFromCart(user, product);
      this.products = this.products.filter(
        prod => prod.productId !== productId,
      );
    } else {
      throw new Error(`product ${product} doesn't exist during delete`);
    }
  }
}
