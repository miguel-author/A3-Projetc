import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

/**
 * Módulo de conexão com o banco de dados.
 * 
 * Este módulo é responsável por configurar a conexão com o banco de dados
 * de forma assíncrona, usando as variáveis de ambiente definidas no arquivo `.env`.
 * 
 * O decorator `@Global()` torna o módulo acessível em toda a aplicação
 * sem a necessidade de importá-lo manualmente em outros módulos.
 */
@Global()
@Module({
  imports: [
    // Carrega variáveis de ambiente do arquivo .env
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true, // torna o ConfigModule acessível globalmente
    }),

    // Configuração do TypeORM usando valores do ConfigService
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],

      // useFactory permite configurar dinamicamente o TypeORM
      useFactory: async (configService: ConfigService) => ({
        type: configService.get<'sqlite' | 'mysql' | 'postgres'>('DB_TYPE'),
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [configService.get<string>('DB_ENTITIES')],
        synchronize: configService.get<boolean>('DB_SYNCHRONIZE') ?? true,
        logging: configService.get<boolean>('DB_LOGGING') ?? false,
      }),
    }),
  ],
})
export class DatabaseModule {}
