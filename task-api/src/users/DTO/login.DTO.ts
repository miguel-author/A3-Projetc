import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

// DTO utilizado para validar os dados recebidos no login.
// Também serve para documentar o formato esperado no Swagger.
export class LoginDTO {

  @ApiProperty({ example: 'seunome@gmail.com' }) 
  // Exemplo visível no Swagger, ajuda o usuário a entender o formato esperado

  @IsEmail() 
  // Valida se o valor enviado realmente tem formato de email
  email: string;

  @ApiProperty({ example: 'senha123' }) 
  // Exemplo visual no Swagger para campo senha

  @IsNotEmpty() 
  // Impede que o campo seja vazio ou ausente

  password: string; // Campo enviado pelo usuário para autenticação
}
