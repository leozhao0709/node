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
import { ShopService } from '../shared/services/shop/shop.service';
import { Request, Response } from 'express';
import { CartService } from '../shared/services/cart/cart.service';
import { ApiUseTags } from '@nestjs/swagger';
import { ProductIdDto } from '../shared/dto/product/product-id.dto';

@ApiUseTags('shop')
@Controller('shop')
export class ShopController {
  constructor(
    private readonly shopService: ShopService,
    private readonly cartService: CartService,
  ) {}

  @Get()
  @Render('shop/index.njk')
  getIndex() {
    const products = this.shopService.$products;
    return {
      products,
      path: '/shop',
    };
  }

  @Get('/products')
  @Render('shop/product-list.njk')
  getProducts() {
    const products = this.shopService.$products;
    return {
      products,
      path: '/shop/products',
    };
  }

  @Get('/products/:productId')
  @Render('shop/product-detail.njk')
  getProductById(@Param('productId') productId: string) {
    const product = this.shopService.getProductById(productId);
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
    const product = this.shopService.getProductById(body.productId);
    if (product) {
      await this.cartService.addToCart(req.user.cart, product);
      res.redirect('/shop/cart');
    }
  }

  @Post('/delete-product-from-cart')
  async deleteProductFromCart(
    @Body() body: ProductIdDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const product = this.shopService.getProductById(body.productId);
    if (product) {
      await this.cartService.deleteProductFromCart(req.user.cart, product);
      res.redirect('/shop/cart');
    }
  }

  @Get('/orders')
  @Render('shop/orders.njk')
  getOrders() {
    return {
      path: '/shop/orders',
    };
  }

  @Get('/checkout')
  @Render('shop/checkout.njk')
  getCheckout() {
    return {
      path: '/shop/checkout',
    };
  }
}
