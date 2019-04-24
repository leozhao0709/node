import { NestExpressApplication } from '@nestjs/platform-express/interfaces';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const swaggerSetup = (app: NestExpressApplication) => {
  const options = new DocumentBuilder()
    .setTitle('App')
    .setDescription('Swagger API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/swagger/api', app, document);
};
