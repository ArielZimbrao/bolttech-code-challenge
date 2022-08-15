import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { HttpExceptionFilter } from './exception/http-exception.filter';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );

  const config = new DocumentBuilder()
    .setTitle('Bolttech Code Challenge API docs')
    .setDescription('The API documentation created by Ariel Zimbrão')
    .setVersion('1.0')
    .addTag('bolttech')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors()
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(parseInt(process.env.APP_PORT, 10) || 3000, '0.0.0.0');
}
bootstrap();