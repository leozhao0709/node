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
import { ProductService } from '../shared/services/product/product.service';
import { ApiUseTags } from '@nestjs/swagger';
import { ProductDto } from '../shared/dto/product/product.dto';
import { CreateProductDto } from '../shared/dto/product/create-product.dto';
import { ProductIdDto } from '../shared/dto/product/product-id.dto';

@Controller('admin')
@ApiUseTags('admin')
export class AdminController {
  constructor(private readonly productService: ProductService) {}

  @Get('/add-product')
  @Render('admin/add-product.njk')
  getAddProduct() {
    return {
      path: '/admin/add-product',
    };
  }

  @Post('/add-product')
  async postAddProduct(@Body() body: CreateProductDto, @Res() res: Response) {
    await this.productService.createProduct(body);
    res.redirect('/admin/products');
  }

  @Get('/products')
  @Render('admin/products.njk')
  async getProducts() {
    const products = await this.productService.getAllProducts();
    return {
      products,
      path: '/admin/products',
    };
  }

  @Get('/edit-product/:productId')
  @Render('admin/edit-product.njk')
  async getEditProduct(@Param('productId') productId: string) {
    const product = await this.productService.getProductById(productId);
    return {
      product,
    };
  }

  @Post('/edit-product')
  async postEditProduct(@Body() body: ProductDto, @Res() res: Response) {
    await this.productService.updateProduct(body);
    res.redirect('/admin/products');
  }

  @Post('/delte-product')
  async postDeleteProduct(@Body() body: ProductIdDto, @Res() res: Response) {
    await this.productService.deleteProductByProductId(body.productId);
    res.redirect('/admin/products');
  }
}
