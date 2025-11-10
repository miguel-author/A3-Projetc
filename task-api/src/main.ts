import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpException, HttpStatus, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  // Cria a aplicação principal a partir do módulo raiz (AppModule)
  const app = await NestFactory.create(AppModule);

  // Habilita CORS (Cross-Origin Resource Sharing)
  // Necessário para permitir que o front-end acesse a API
  // Pode ser configurado com origem e métodos específicos em produção
  app.enableCors();

  // Configuração do Swagger para documentação automática da API
  const config = new DocumentBuilder()
    .setTitle('Text-Corr')
    .setDescription('Aplicação para correlação entre documentos')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  //  Aplica validação global em todos os endpoints
  // - whitelist: remove campos não definidos nos DTOs
  // - forbidNonWhitelisted: rejeita campos extras não esperados
  // - transform: converte tipos automaticamente conforme DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (errors) =>
        new HttpException(
          {
            message: 'Entrada de dados inválida',
            errors: errors,
          },
          HttpStatus.BAD_REQUEST,
        ),
    }),
  );

  //  Inicia o servidor na porta definida em variável de ambiente ou 3001
  const port = process.env.PORT ? Number(process.env.PORT) : 3001;
  await app.listen(port);

  //  Loga no console a URL do servidor
  console.log(`Servidor rodando em http://localhost:${port}`);
}

// 🔁 Executa a função de inicialização
bootstrap();
