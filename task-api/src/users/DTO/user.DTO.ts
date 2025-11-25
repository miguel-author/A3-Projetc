import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

// DTO responsável por validar e documentar os dados enviados para criação ou atualização de usuário.
// Garante que os campos obrigatórios sejam informados corretamente.
export class UserDTO {

  @ApiProperty({ example: 'João Silva', description: 'Nome completo do usuário' })
  @IsNotEmpty() // Impede envio vazio ou ausente
  @IsString()   // Deve ser string
  nome: string;

  @ApiProperty({ example: 'seunome@gmail.com', description: 'E-mail único do usuário' })
  @IsNotEmpty() // Obrigatório
  @IsEmail()    // Valida o formato de email
  email: string;

  @ApiProperty({ example: 'senha123', description: 'Senha com no mínimo 6 caracteres' })
  @IsNotEmpty() // Obrigatório
  @MinLength(6) // Define uma validação mínima (segurança mínima)
  password: string;
}
