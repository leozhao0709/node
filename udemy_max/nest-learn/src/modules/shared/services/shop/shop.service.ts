import { Injectable } from '@nestjs/common';
import { Product } from '../../../database/entities/product.entity';
import { CartService } from '../cart/cart.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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

  private async saveProducts() {
    try {
      this.productRepository.save(this.products);
    } catch (error) {
      // tslint:disable-next-line: no-console
      console.log(error);
    }
  }

  getProductById(productId: string) {
    return this.products.find(product => product.productId === productId);
  }

  async addProduct(product: Product) {
    this.products.push(product);
    await this.saveProducts();
  }

  async updateProduct(product: Product) {
    const existingProductindex = this.products!.findIndex(
      prod => prod.productId === product.productId,
    );

    if (existingProductindex !== -1) {
      this.products[existingProductindex] = product;
    }

    await this.saveProducts();
  }

  async deleteProductByProductId(productId: string) {
    const product = this.getProductById(productId);
    if (product) {
      this.cartService.deleteProductFromCart(product);
    }
    this.products = this.products.filter(prod => prod.productId !== productId);
    await this.saveProducts();
  }
}
