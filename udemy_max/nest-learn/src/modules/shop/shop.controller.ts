import {
  Controller,
  Get,
  Render,
  Param,
  Post,
  Body,
  Res,
  Req,
} from '@nestjs/common';
import { ProductService } from '../shared/services/product/product.service';
import { Request, Response } from 'express';
import { CartService } from '../shared/services/cart/cart.service';
import { ApiUseTags } from '@nestjs/swagger';
import { ProductIdDto } from '../shared/dto/product/product-id.dto';
import { OrderService } from '../shared/services/order/order.service';

@ApiUseTags('shop')
@Controller('shop')
export class ShopController {
  constructor(
    private readonly productService: ProductService,
    private readonly cartService: CartService,
    private readonly orderService: OrderService,
  ) {}

  @Get()
  @Render('shop/index.njk')
  getIndex(@Req() req: Request) {
    const products = req.user.products;
    return {
      products,
      path: '/shop',
    };
  }

  @Get('/products')
  @Render('shop/product-list.njk')
  getProducts(@Req() req: Request) {
    const products = req.user.products;
    return {
      products,
      path: '/shop/products',
    };
  }

  @Get('/products/:productId')
  @Render('shop/product-detail.njk')
  getProductById(@Param('productId') productId: string, @Req() req: Request) {
    const product = this.productService.getProductById(productId);
    return {
      product,
      path: '/shop/products',
    };
  }

  @Get('/cart')
  @Render('shop/cart.njk')
  getCart(@Req() req: Request) {
    const cart = req.user.cart;
    if (cart) {
      const cartItems = cart.cartItems;
      return {
        cartItems,
        path: '/shop/cart',
      };
    }
  }

  @Post('/cart')
  async postCart(
    @Body() body: ProductIdDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const product = this.productService.getProductById(body.productId);
    if (product) {
      await this.cartService.addToCart(product);
      res.redirect('/shop/cart');
    }
  }

  @Post('/delete-product-from-cart')
  async deleteProductFromCart(
    @Body() body: ProductIdDto,
    @Res() res: Response,
  ) {
    const product = this.productService.getProductById(body.productId);
    if (product) {
      await this.cartService.deleteProductFromCart(product);
      res.redirect('/shop/cart');
    }
  }

  @Get('/orders')
  @Render('shop/orders.njk')
  getOrders() {
    const orders = this.orderService.user.orders;
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
