import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, HttpException, HttpStatus } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();

  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: "http://localhost:3000",
    credentials: true,
  });

  // 🔥 Adicionando bearer auth ao Swagger
  const config = new DocumentBuilder()
    .setTitle('Task API')
    .setDescription('API para gerenciamento de usuários e tarefas com MongoDB')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (errors) =>
        new HttpException(
          { message: 'Entrada de dados inválida', errors },
          HttpStatus.BAD_REQUEST,
        ),
    }),
  );

  const PORT = process.env.PORT || 3001;
  await app.listen(PORT);

  console.log(`🚀 Servidor rodando em: http://localhost:${PORT}`);
  console.log(`📄 Swagger disponível em: http://localhost:${PORT}/api/docs`);
}

bootstrap();
