import {
  Controller,
  Get,
  Post,
  Param,
  Render,
  Body,
  Res,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { ProductService } from '../shared/services/product/product.service';
import { ApiUseTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { CreateProductDto } from '../../dto/product/create-product.dto';
import { ProductDto } from '../../dto/product/product.dto';
import { ProductIdDto } from '../../dto/product/product-id.dto';
import { UserNotHavePermissionException } from '../../exceptions/user/userNotHavePermissionException';

@Controller('admin')
@UseGuards(AuthGuard)
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
  async postAddProduct(
    @Body() body: CreateProductDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    await this.productService.createProduct(req.user, body);
    res.redirect('/admin/products');
  }

  @Get('/products')
  @Render('admin/products.njk')
  async getProducts(@Req() req: Request) {
    const infoMsg = await req.consumeFlash('admin-products-info');
    const products = await this.productService.getAllProductsByUserId(
      req.user.id,
    );
    return {
      products,
      infoMsg,
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
  async postEditProduct(
    @Body() body: ProductDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      await this.productService.updateProduct(req.user, body);
      return res.redirect('/admin/products');
    } catch (error) {
      if (error instanceof UserNotHavePermissionException) {
        await req.flash(
          'admin-products-info',
          `You don't have permission to edit this product!`,
        );
        return res.redirect('/admin/products');
      }
      // tslint:disable-next-line: no-console
      console.log(error);
    }
  }

  @Post('/delte-product')
  async postDeleteProduct(
    @Body() body: ProductIdDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      await this.productService.deleteProductByProductId(
        req.user,
        body.productId,
      );
      res.redirect('/admin/products');
    } catch (error) {
      if (error instanceof UserNotHavePermissionException) {
        await req.flash(
          'admin-products-info',
          `You don't have permission to delete this product!`,
        );
        return res.redirect('/admin/products');
      }
      // tslint:disable-next-line: no-console
      console.log(error);
    }
  }
}
