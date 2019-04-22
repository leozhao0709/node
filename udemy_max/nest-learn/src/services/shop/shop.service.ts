import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { Product } from '../../models/product';
import { CartService } from '../cart/cart.service';

@Injectable()
export class ShopService {
  private productFile = path.resolve(
    path.dirname(process.mainModule!.filename),
    'data',
    'product.json',
  );

  private products: Product[];

  /**
   * Getter $products
   * @return {Product[]}
   */
  public get $products(): Product[] {
    return this.products;
  }

  constructor(private readonly cartService: CartService) {
    this.fetchAllProducts().then(prods => (this.products = prods));
  }

  private async fetchAllProducts(): Promise<Product[]> {
    try {
      const fileContent = await fs.promises.readFile(this.productFile);
      return JSON.parse(fileContent.toString());
    } catch (error) {
      return [];
    }
  }

  private async saveProductsToFile() {
    try {
      if (!fs.existsSync(path.resolve(this.productFile, '..'))) {
        fs.mkdirSync(path.resolve(this.productFile, '..'), { recursive: true });
      }
      await fs.promises.writeFile(
        this.productFile,
        JSON.stringify(this.products),
      );
    } catch (error) {
      // tslint:disable-next-line: no-console
      console.log(error);
    }
  }

  getProductById(id: string) {
    return this.products.find(product => product.id === id);
  }

  async addProduct(product: Product) {
    this.products.push(product);
    await this.saveProductsToFile();
  }

  async updateProduct(product: Product) {
    const existingProductindex = this.products!.findIndex(
      prod => prod.id === product.id,
    );

    if (existingProductindex !== -1) {
      this.products[existingProductindex] = product;
    }

    await this.saveProductsToFile();
  }

  async deleteProductById(productId: string) {
    const product = this.getProductById(productId);
    if (product) {
      this.cartService.deleteProductFromCart(product);
    }
    this.products = this.products.filter(prod => prod.id !== productId);
    await this.saveProductsToFile();
  }
}
