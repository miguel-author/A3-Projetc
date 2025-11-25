import { ApiProperty } from "@nestjs/swagger"; 
// ApiProperty é usado para documentar os campos no Swagger

// DTO usado para requisição de login
export class LoginDto {
  @ApiProperty() // documento no Swagger o campo email
  email: string;

  @ApiProperty() // documenta o campo senha (no service provavelmente será "password")
  senha: string;
}

// DTO representando uma resposta bem-sucedida no login
export class LoginSuccessDto {
  @ApiProperty()
  statusCode: number; // Código HTTP retornado pelo servidor

  @ApiProperty()
  message: string; // Mensagem de feedback da API

  @ApiProperty()
  error: string | null; // Erro é null em caso de sucesso

  @ApiProperty({ type: LoginDto }) // Swagger reconhece que esse campo é um objeto LoginDto
  user: LoginDto;
}

// DTO representando falha no login
export class LoginFailureDto {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  message: string;

  @ApiProperty()
  error: string; // Retorna um texto explicando o erro
}

// Objeto com exemplo de requisição de login para o Swagger
export const loginDto : LoginDto = {
  email: "exemplo@email.com",
  senha: "sua_senha",
}

// Configuração de resposta para falha de login usada pelo Swagger
export const loginFailureDto = {
  status: 400, // código HTTP esperado
  description: "Credenciais inválidas.",
  type: LoginFailureDto, // modelo representado
};

// Configuração de resposta de sucesso no login para Swagger
export const loginSuccessResponse = {
  status: 201, // código HTTP esperado (talvez deveria ser 200 para login)
  description: "Login realizado com sucesso.",
  access_token: "string", // exemplo de token JWT retornado
  type: LoginSuccessDto, // modelo usado para documentação
};
