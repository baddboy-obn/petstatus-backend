import { NestFactory } from '@nestjs/core';
import { AppModule } from './AppModule';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  dotenv.config({
    path: '.develop.env',
  });

  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('Pet status API')
    .setDescription('Pet status application')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  app.enableCors({
    credentials: true,
    origin: process.env.ALLOWED_ORIGINS.split(','),
  });

  await app.listen(process.env.PORT);
}
void bootstrap();
