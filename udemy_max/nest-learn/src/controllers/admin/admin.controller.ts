import {
  Controller,
  Get,
  Post,
  Param,
  Render,
  Body,
  Req,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import * as uuid from 'uuid/v4';
import { ShopService } from '../../services/shop/shop.service';
import { Product } from '../../models/product';

@Controller('admin')
export class AdminController {
  constructor(private readonly shopService: ShopService) {}

  @Get('/add-product')
  @Render('admin/add-product.njk')
  getAddProduct() {
    return {
      path: '/admin/add-product',
    };
  }

  @Post('/add-product')
  async postAddProduct(@Body() body, @Res() res: Response) {
    const { title, imageUrl, description, price } = body;
    const id = uuid();
    const product = new Product(id, title, imageUrl, description, price);
    await this.shopService.addProduct(product);
    res.redirect('/admin/products');
  }

  @Get('/products')
  @Render('admin/products.njk')
  getProducts() {
    const products = this.shopService.$products;
    return {
      products,
      path: '/admin/products',
    };
  }

  @Get('/edit-product/:productId')
  @Render('admin/edit-product.njk')
  getEditProduct(@Param('productId') productId: string) {
    const product = this.shopService.getProductById(productId);
    return {
      product,
    };
  }

  @Post('/edit-product')
  async postEditProduct(@Body() body, @Res() res: Response) {
    const { productId, imageUrl, title, price, description } = body;
    const product = this.shopService.getProductById(productId);
    if (product) {
      product.imageUrl = imageUrl;
      product.title = title;
      product.price = price;
      product.description = description;
      await this.shopService.updateProduct(product);
      res.redirect('/admin/products');
    }
  }

  @Post('/delte-product')
  async postDeleteProduct(
    @Body('productId') productId: string,
    @Res() res: Response,
  ) {
    await this.shopService.deleteProductById(productId);
    res.redirect('/admin/products');
  }
}
