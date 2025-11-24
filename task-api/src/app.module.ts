import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './users/users.module';
import { Counter, CounterSchema } from './users/schemas/counter.schema';
import { AuthModule } from './auth/auth.module';

/**
 * Módulo raiz da aplicação.
 * 
 * - ConfigModule: carrega variáveis do arquivo .env e torna disponível globalmente.
 * - MongooseModule: conecta a aplicação ao MongoDB usando a URL armazenada no .env.
 * - UserModule: módulo que contém usuários e tarefas.
 */
@Module({
  imports: [
    // Torna variáveis do .env disponíveis em todo o app
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // Conexão com MongoDB via Mongoose
    MongooseModule.forRoot(process.env.MONGO_URI as string, {
      dbName: process.env.DB_NAME || 'taskapi',
    }),
  MongooseModule.forFeature([
      { name: Counter.name, schema: CounterSchema },
    ]),
    // Módulos da aplicação
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
