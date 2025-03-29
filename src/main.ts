import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const swaggerConfig = new DocumentBuilder()
    .setTitle('FLexfolio API') // Title of API
    .setDescription('API documentation for the FlexFolio') // Description
    .setVersion('1.0') // API version
    .addBearerAuth() // JWT Authentication Support
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document); // API docs route
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
