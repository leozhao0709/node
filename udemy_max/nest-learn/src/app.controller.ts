import { Controller, Get, Render, Header, Headers } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('shop/index.njk')
  getHello() {
    return { message: 'Hello World!' };
  }
}
