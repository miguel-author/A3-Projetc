import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, HttpException, HttpStatus } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as dotenv from 'dotenv';

async function bootstrap() {
  // Carrega variáveis de ambiente a partir do arquivo .env
  dotenv.config();

  // Cria a aplicação NestJS usando o módulo raiz (AppModule)
  const app = await NestFactory.create(AppModule);

  // Habilita CORS permitindo comunicação com o front-end (ex.: React ou NextJS)
  app.enableCors({
    origin: "http://localhost:3000", // URL permitida
    credentials: true, // permite envio de cookies/tokens
  });

  // 🔥 Configuração do Swagger (documentação da API)
  const config = new DocumentBuilder()
    .setTitle('Task API') // Nome do projeto na documentação
    .setDescription('API para gerenciamento de usuários e tarefas com MongoDB')
    .setVersion('1.0.0')
    .addBearerAuth() // Adiciona autenticação via JWT ao Swagger
    .build();

  // Gera a documentação com base nos decorators do projeto
  const document = SwaggerModule.createDocument(app, config);

  // Define rota onde Swagger ficará disponível
  SwaggerModule.setup('/api/docs', app, document);

  // 🚨 Configura validações globais para DTOs e requisições
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove campos que não existem no DTO
      forbidNonWhitelisted: true, // Bloqueia requisição com campos extras
      transform: true, // Converte payloads para os tipos esperados no DTO
      exceptionFactory: (errors) =>
        new HttpException(
          {
            message: 'Entrada de dados inválida',
            errors, // Retorna lista de validações que falharam
          },
          HttpStatus.BAD_REQUEST,
        ),
    }),
  );

  // Define porta via variável de ambiente ou usa 3001 como padrão
  const PORT = process.env.PORT || 3001;
  await app.listen(PORT);

  // Logs úteis no terminal ao iniciar o servidor
  console.log(`🚀 Servidor rodando em: http://localhost:${PORT}`);
  console.log(`📄 Swagger disponível em: http://localhost:${PORT}/api/docs`);
}

bootstrap();
