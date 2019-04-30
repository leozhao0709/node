import {
  Controller,
  Get,
  Post,
  Param,
  Render,
  Body,
  Res,
  Req,
} from '@nestjs/common';
import { Response, Request } from 'express';
import * as uuid from 'uuid/v4';
import { ProductService } from '../shared/services/product/product.service';
import { Product } from '../database/entities/product.entity';
import { ApiUseTags } from '@nestjs/swagger';
import { EditProductDto } from '../shared/dto/product/edit-product.dto';
import { AddProductDto } from '../shared/dto/product/add-product.dto';
import { ProductIdDto } from '../shared/dto/product/product-id.dto';

@Controller('admin')
@ApiUseTags('admin')
export class AdminController {
  constructor(private readonly shopService: ProductService) {}

  @Get('/add-product')
  @Render('admin/add-product.njk')
  getAddProduct() {
    return {
      path: '/admin/add-product',
    };
  }

  @Post('/add-product')
  async postAddProduct(
    @Body() body: AddProductDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const productId = uuid();
    const product: Product = {
      user: req.user,
      productId,
      ...body,
    };
    await this.shopService.addProduct(product);
    res.redirect('/admin/products');
  }

  @Get('/products')
  @Render('admin/products.njk')
  getProducts(@Req() req: Request) {
    const products = req.user.products;
    return {
      products,
      path: '/admin/products',
    };
  }

  @Get('/edit-product/:productId')
  @Render('admin/edit-product.njk')
  getEditProduct(@Param('productId') productId: string, @Req() req: Request) {
    const product = this.shopService.getProductById(productId);
    return {
      product,
    };
  }

  @Post('/edit-product')
  async postEditProduct(
    @Body() body: EditProductDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
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
  async postDeleteProduct(
    @Body() body: ProductIdDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    await this.shopService.deleteProductByProductId(body.productId);
    res.redirect('/admin/products');
  }
}
