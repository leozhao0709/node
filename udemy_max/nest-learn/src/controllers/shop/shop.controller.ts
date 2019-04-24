import {
  Controller,
  Get,
  Render,
  Param,
  Post,
  Body,
  Res,
} from '@nestjs/common';
import { ShopService } from '../../services/shop/shop.service';
import { Response } from 'express';
import { CartService } from '../../services/cart/cart.service';
import { Product } from '../../models/product';
import { ApiUseTags, ApiImplicitBody, ApiModelProperty } from '@nestjs/swagger';

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
  getCart() {
    const cart = this.cartService.$cart;
    if (cart) {
      const cartProdData: Array<{ product: Product; qty: number }> = [];
      cart.products.forEach(prod => {
        const product = this.shopService.getProductById(prod.productId);
        if (product) {
          cartProdData.push({ product, qty: prod.qty });
        }
      });
      return {
        cartProdData,
        path: '/shop/cart',
      };
    }
  }

  @Post('/cart')
  @ApiImplicitBody({ name: 'body', type: {productId: String} })
  async postCart(@Body() body: {productId: string}, @Res() res: Response) {
    const product = this.shopService.getProductById(body.productId);
    if (product) {
      await this.cartService.addToCart(product);
      res.redirect('/shop/cart');
    }
  }

  @Post('/delete-product-from-cart')
  @ApiImplicitBody({ name: 'productId', type: String })
  async deleteProductFromCart(
    @Body('productId') productId: string,
    @Res() res: Response,
  ) {
    const product = this.shopService.getProductById(productId);
    if (product) {
      await this.cartService.deleteProductFromCart(product);
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
