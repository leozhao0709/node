import {
  Controller,
  Get,
  Render,
  Param,
  Post,
  Body,
  Res,
} from '@nestjs/common';
import { ProductService } from '../shared/services/product/product.service';
import { Response } from 'express';
import { ApiUseTags } from '@nestjs/swagger';
import { ProductIdDto } from '../shared/dto/product/product-id.dto';
import { UserService } from '../shared/services/user/user.service';
import { OrderService } from '../shared/services/order/order.service';

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
  async getIndex() {
    const products = await this.productService.getAllProducts();
    return {
      products,
      path: '/shop',
    };
  }

  @Get('/products')
  @Render('shop/product-list.njk')
  async getProducts() {
    const products = await this.productService.getAllProducts();
    return {
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
  @Render('shop/cart.njk')
  async getCart() {
    const cart = await this.userService.getCart();
    if (cart) {
      return {
        cart,
        path: '/shop/cart',
      };
    }
  }

  @Post('/cart')
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
  @Render('shop/orders.njk')
  async getOrders() {
    const orders = await this.orderService.getOrders();
    return {
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
  getCheckout() {
    return {
      path: '/shop/checkout',
    };
  }
}
