import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsEnum, IsDateString } from 'class-validator';
import { TaskStatus } from './task.enum';

// DTO responsável por validar e documentar os dados de criação/edição de tarefas.
// Ele garante que apenas campos válidos serão enviados ao banco.
export class TaskDTO {

  @ApiProperty({ example: 'Estudar NestJS', description: 'Título da tarefa' })
  @IsNotEmpty() // Campo obrigatório
  @IsString()   // Deve ser texto
  title: string;

  @ApiProperty({ example: 'Finalizar módulo de Mongoose', required: false })
  @IsOptional() // Campo opcional
  @IsString()   // Caso enviado, deve ser texto
  description?: string;

  @ApiProperty({
    enum: TaskStatus, // Documenta no Swagger as opções possíveis
    default: TaskStatus.PENDENTE,
  })
  @IsOptional() // Não precisa ser enviado na criação
  @IsEnum(TaskStatus) // Garante que o valor pertence ao enum TaskStatus
  status?: TaskStatus;

  @ApiProperty({
    example: '2025-12-31',
    description: 'Data de expiração da tarefa (formato ISO)',
    required: false,
  })
  @IsOptional()
  @IsDateString() // Valida formato de data (YYYY-MM-DD no padrão ISO)
  expirationDate?: Date;

  @ApiProperty({
    example: '6734df09121a19c70646605f',
    description: 'ID do usuário ao qual a tarefa pertence',
    required: false,
  })
  @IsOptional()
  userId?: string; 
  // Geralmente preenchido automaticamente via token — não pelo cliente
}
