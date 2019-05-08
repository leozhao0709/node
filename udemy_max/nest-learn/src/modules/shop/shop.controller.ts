import {
  Controller,
  Get,
  Render,
  Param,
  Post,
  Body,
  Res,
  UseGuards,
  Session,
} from '@nestjs/common';
import { ProductService } from '../shared/services/product/product.service';
import { Response } from 'express';
import { ApiUseTags } from '@nestjs/swagger';
import { UserService } from '../shared/services/user/user.service';
import { OrderService } from '../shared/services/order/order.service';
import { AuthGuard } from '../auth/auth.guard';
import { ProductIdDto } from '../../dto/product/product-id.dto';

@ApiUseTags('shop')
@Controller('shop')
export class ShopController {
  constructor(
    private readonly productService: ProductService,
    private readonly userService: UserService,
    private readonly orderService: OrderService,
  ) {}

  @Get()
  @Render('shop/index.njk')
  async getIndex(@Session() session: Express.Session) {
    const products = await this.productService.getAllProducts();
    const isLoggedIn = session.isLoggedIn;
    return {
      isLoggedIn,
      products,
      path: '/shop',
    };
  }

  @Get('/products')
  @Render('shop/product-list.njk')
  async getProducts(@Session() session: Express.Session) {
    const products = await this.productService.getAllProducts();
    const isLoggedIn = session.isLoggedIn;
    return {
      isLoggedIn,
      products,
      path: '/shop/products',
    };
  }

  @Get('/products/:productId')
  @Render('shop/product-detail.njk')
  async getProductById(@Param('productId') productId: string) {
    const product = await this.productService.getProductById(productId);
    return {
      product,
      path: '/shop/products',
    };
  }

  @Get('/cart')
  @UseGuards(AuthGuard)
  @Render('shop/cart.njk')
  async getCart(@Session() session: Express.Session) {
    const cart = await this.userService.getCart();
    if (cart) {
      return {
        isLoggedIn: session.isLoggedIn,
        cart,
        path: '/shop/cart',
      };
    }
  }

  @Post('/cart')
  @UseGuards(AuthGuard)
  async postCart(@Body() body: ProductIdDto, @Res() res: Response) {
    await this.userService.addProductToCartById(body.productId);
    res.redirect('/shop/cart');
  }

  @Post('/delete-product-from-cart')
  async deleteProductFromCart(
    @Body() body: ProductIdDto,
    @Res() res: Response,
  ) {
    await this.userService.deleteProductFromCartById(body.productId);
    res.redirect('/shop/cart');
  }

  @Get('/orders')
  @UseGuards(AuthGuard)
  @Render('shop/orders.njk')
  async getOrders(@Session() session: Express.Session) {
    const orders = await this.orderService.getOrders();
    return {
      isLoggedIn: session.isLoggedIn,
      orders,
      path: '/shop/orders',
    };
  }

  @Post('/create-order')
  async postOrders(@Res() res: Response) {
    await this.orderService.createOrderFromCart();
    res.redirect('/shop/orders');
  }

  @Get('/checkout')
  @Render('shop/checkout.njk')
  getCheckout(@Session() session: Express.Session) {
    return {
      isLoggedIn: session.isLoggedIn,
      path: '/shop/checkout',
    };
  }
}
