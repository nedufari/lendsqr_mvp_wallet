import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe)
  app.enableCors({
    methods:["GET","HEAD","PUT","PATCH","POST","DELETE"],
    origin:["*"]
  
  });
  app.setGlobalPrefix('api/v1/')
  await app.listen(3000,);
}
bootstrap();


