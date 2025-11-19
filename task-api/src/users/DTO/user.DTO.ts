import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UserDTO {
  @ApiProperty({ example: 'João Silva', description: 'Nome completo do usuário' })
  @IsNotEmpty()
  @IsString()
  nome: string;

  @ApiProperty({ example: 'email@email.com', description: 'E-mail único do usuário' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'senha123', description: 'Senha com no mínimo 6 caracteres' })
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
