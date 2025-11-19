import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsEnum, IsDateString } from 'class-validator';

export class TaskDTO {
  @ApiProperty({ example: 'Estudar NestJS', description: 'Título da tarefa' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ example: 'Finalizar módulo de Mongoose', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    enum: ['pendente', 'progresso', 'concluída'],
    default: 'pendente',
  })
  @IsOptional()
  @IsEnum(['pendente', 'progresso', 'concluída'])
  status?: string;

  @ApiProperty({
    example: '2025-12-31',
    description: 'Data de expiração da tarefa (formato ISO)',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  expirationDate?: Date;

  @ApiProperty({
    example: '6734df09121a19c70646605f',
    description: 'ID do usuário ao qual a tarefa pertence',
  })
  @IsNotEmpty()
  userId: string;
}
