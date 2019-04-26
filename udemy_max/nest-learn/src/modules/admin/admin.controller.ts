import {
  Controller,
  Get,
  Post,
  Param,
  Render,
  Body,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import * as uuid from 'uuid/v4';
import { ShopService } from '../shared/services/shop/shop.service';
import { Product } from '../database/entities/product.entity';
import { ApiUseTags } from '@nestjs/swagger';
import { EditProductDto } from '../shared/dto/product/edit-product.dto';
import { AddProductDto } from '../shared/dto/product/add-product.dto';
import { ProductIdDto } from '../shared/dto/product/product-id.dto';

@Controller('admin')
@ApiUseTags('admin')
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
  async postAddProduct(@Body() body: AddProductDto, @Res() res: Response) {
    const productId = uuid();
    const product: Product = {
      productId,
      ...body,
    };
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
  async postEditProduct(@Body() body: EditProductDto, @Res() res: Response) {
    let product = this.shopService.getProductById(body.productId);
    if (product) {
      product = {
        ...product,
        ...body,
      };
      await this.shopService.updateProduct(product);
      res.redirect('/admin/products');
    }
  }

  @Post('/delte-product')
  async postDeleteProduct(@Body() body: ProductIdDto, @Res() res: Response) {
    await this.shopService.deleteProductByProductId(body.productId);
    res.redirect('/admin/products');
  }
}
