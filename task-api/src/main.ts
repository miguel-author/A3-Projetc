import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, HttpException, HttpStatus } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as dotenv from 'dotenv';

async function bootstrap() {
  // Carrega variáveis do .env (caso ainda não estejam carregadas)
  dotenv.config();

  const app = await NestFactory.create(AppModule);

  // Habilita CORS — necessário para permitir requisições externas (ex: frontend React)
  app.enableCors();

  // Swagger (documentação automática da API)
  const config = new DocumentBuilder()
    .setTitle('Task API')
    .setDescription('API para gerenciamento de usuários e tarefas com MongoDB')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  // Validação global para DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove campos não permitidos
      forbidNonWhitelisted: true, // bloqueia payloads suspeitos
      transform: true,
      exceptionFactory: (errors) =>
        new HttpException(
          { message: 'Entrada de dados inválida', errors },
          HttpStatus.BAD_REQUEST,
        ),
    }),
  );

  // Porta configurável via .env ou fallback padrão
  const PORT = process.env.PORT || 3001;

  await app.listen(PORT);
  console.log(`🚀 Servidor rodando em: http://localhost:${PORT}`);
  console.log(`📄 Swagger disponível em: http://localhost:${PORT}/api/docs`);
}

bootstrap();
