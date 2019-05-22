import { NestExpressApplication } from '@nestjs/platform-express/interfaces';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as path from 'path';
import * as nunjucks from 'nunjucks';
import { HttpExceptionFilter } from './exception-filters/httpException/http-exception.filter';
import { swaggerSetup } from './swagger/swaggerSetup';
import * as session from 'express-session';
import * as csurf from 'csurf';
import { environment } from './environment/environment';
import connectMongodbSession = require('connect-mongodb-session');
import * as bodyParser from 'body-parser';
import { flash } from 'express-flash-message';
import { GlobalExceptionFilter } from './exception-filters/global-exception/global-exception.filter';
import express = require('express');

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const mongodbStore = connectMongodbSession(session);
  const store = new mongodbStore({
    uri: environment.MONGODB_URI,
    collection: 'sessions',
  });
  // app.enableCors();
  app.use(
    session({
      secret: 'secret',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
      },
      store,
    }),
  );

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(csurf());
  app.use(flash({ sessionKeyName: 'flashMessage' }));

  app.useStaticAssets(path.resolve(__dirname, 'public'));
  app.useStaticAssets(path.resolve(__dirname, 'uploads'), {
    prefix: '/uploads',
  });
  nunjucks.configure(path.resolve(__dirname, 'views'), {
    autoescape: true,
    express: app,
  });

  // swagger setup
  swaggerSetup(app);

  app.useGlobalFilters(new GlobalExceptionFilter(), new HttpExceptionFilter());

  // app.use(userMiddleware);

  const port = environment.PORT;
  await app.listen(port);
}
bootstrap();
