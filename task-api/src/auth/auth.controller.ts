import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from '../users/DTO/login.DTO';
import { UserDTO } from '../users/DTO/user.DTO';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@Controller('auth') 
@ApiTags('Autenticação') 
export class AuthController {
  // Injeta o AuthService para permitir chamadas de validação e registro.
  constructor(private readonly authService: AuthService) {}

  @Post('login')  
  // Documenta no Swagger o propósito da rota.
  @ApiOperation({ summary: 'Realizar login e gerar token JWT' })  

  // Define o corpo esperado da requisição no Swagger.
  @ApiBody({ type: LoginDTO })   

  // Respostas possíveis para documentação.
  @ApiResponse({ status: 200, description: 'Login bem-sucedido.' })
  @ApiResponse({ status: 401, description: 'Credenciais inválidas.' })

  // Método responsável pelo login.
  async login(@Body() credentials: LoginDTO): Promise<{ access_token: string }> {

    // Chama o service para validar o usuário com base no email e senha.
    const user = await this.authService.validateUser(
      credentials.email,
      credentials.password,
    );

    // Se o usuário for válido, retorna o token JWT.
    return this.authService.login(user);
  }

  @Post('register') 
  // Documentação do Swagger para o endpoint de registro.
  @ApiOperation({ summary: 'Registrar um novo usuário' })
  @ApiResponse({ status: 201, description: 'Usuário registrado com sucesso.' })

  // Método para registrar novos usuários.
  async register(@Body() user: UserDTO) {
    return this.authService.register(user);
  }
}
