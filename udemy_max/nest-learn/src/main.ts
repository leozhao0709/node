import { NestExpressApplication } from '@nestjs/platform-express/interfaces';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as path from 'path';
import * as nunjucks from 'nunjucks';
import { HttpExceptionFilter } from './modules/shared/filters/httpException/http-exception.filter';
import { swaggerSetup } from './swagger/swaggerSetup';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(path.resolve(__dirname, 'public'));
  nunjucks.configure(path.resolve(__dirname, 'views'), {
    autoescape: true,
    express: app,
  });

  app.useGlobalFilters(new HttpExceptionFilter());

  // swagger setup
  swaggerSetup(app);

  // app.use(userMiddleware);

  const port = process.env.PORT || 5000;
  await app.listen(port);
}
bootstrap();
