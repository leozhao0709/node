import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from '../../../mongo-db/schemas/order.schema';
import { User } from '../../../mongo-db/schemas/user.schema';
import { Response } from 'express';
import * as path from 'path';
import * as fs from 'fs';
import * as PDFDocument from 'pdfkit';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel('Order') private readonly orderModel: Model<Order>,
    @InjectModel('User') private readonly userModel: Model<User>,
  ) {}

  async getOrders(user: User) {
    return await this.orderModel
      .find({
        'user.userId': user.id,
      })
      .exec();
  }

  async createOrderFromCart(user: User) {
    const orderProducts = (await this.userModel
      .findById(user.id)
      .populate('cart.productId')).cart.map(item => {
      return { quantity: item.quantity, product: item.productId };
    });
    await this.orderModel.create({
      user: {
        email: user.email,
        userId: user.id,
      },
      products: orderProducts,
    });

    user.cart = [];
    await user.save();
  }

  async generateInvoiceAndSendToResponse(
    orderId: string,
    user: User,
    res: Response,
  ) {
    const order = await this.orderModel.findById(orderId);
    if (!order) {
      throw new Error('order not found!');
    }

    if (order.user.userId.toString() !== user.id) {
      throw new UnauthorizedException();
    }

    const invoiceName = 'invoice-' + orderId + '.pdf';
    const invoiceDir = path.resolve(
      path.dirname(process.mainModule.filename),
      'data',
      'invoices',
    );

    if (!fs.existsSync(invoiceDir)) {
      fs.mkdirSync(invoiceDir, { recursive: true });
    }
    const invoicePath = path.join(invoiceDir, invoiceName);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `inline; filename=${invoiceName}`);

    if (fs.existsSync(invoicePath)) {
      const file = fs.createReadStream(invoicePath);
      return file.pipe(res);
    }

    const pdfDoc = new PDFDocument();
    pdfDoc.pipe(fs.createWriteStream(invoicePath));
    pdfDoc.pipe(res);
    pdfDoc.fontSize(26).text('Invoice', {
      underline: true,
    });
    pdfDoc.text('-----------------------');

    const totalPrice = order.products.reduce((prev, cur) => {
      pdfDoc.fontSize(14).text(`
        ${cur.product.title} - ${cur.quantity} x $${cur.product.price}
      `);
      return prev + cur.product.price * cur.quantity;
    }, 0);

    pdfDoc.text('-----------------------');
    pdfDoc.fontSize(20).text('Total Price: $' + totalPrice);

    pdfDoc.end();
  }
}
