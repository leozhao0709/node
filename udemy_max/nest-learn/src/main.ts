import { NestExpressApplication } from '@nestjs/platform-express/interfaces';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as path from 'path';
import * as nunjucks from 'nunjucks';
import { HttpExceptionFilter } from './modules/shared/filterExceptions/httpException/http-exception.filter';
import { swaggerSetup } from './swagger/swaggerSetup';
import * as session from 'express-session';
import { environment } from './environment/environment';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(
    session({
      secret: 'secret',
      resave: false,
      saveUninitialized: false,
    }),
  );

  app.useStaticAssets(path.resolve(__dirname, 'public'));
  nunjucks.configure(path.resolve(__dirname, 'views'), {
    autoescape: true,
    express: app,
  });

  // swagger setup
  swaggerSetup(app);

  app.useGlobalFilters(new HttpExceptionFilter());

  // app.use(userMiddleware);

  const port = environment.PORT;
  await app.listen(port);
}
bootstrap();
