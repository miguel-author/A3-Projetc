import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from 'src/users/entity/user.entity';

/**
 * Controlador responsável pelas rotas de autenticação.
 * 
 * Inclui endpoints para login e registro de novos usuários.
 */
@Controller('auth')
@ApiTags('Autenticação')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Realiza o login de um usuário e retorna um token JWT.
   * 
   * @param credentials Objeto contendo `username` e `password`.
   * @returns Token de autenticação JWT.
   */
  @Post('login')
  @ApiOperation({ summary: 'Autenticar usuário e gerar token JWT' })
  @ApiResponse({
    status: 200,
    description: 'Login realizado com sucesso.',
    type: String,
  })
  @ApiResponse({ status: 401, description: 'Credenciais inválidas.' })
  async login(
    @Body() credentials: { username: string; password: string },
  ): Promise<{ access_token: string }> {
    const user = await this.authService.validateUser(
      credentials.username,
      credentials.password,
    );
    return this.authService.login(user);
  }

  /**
   * Registra um novo usuário no sistema.
   * 
   * @param user Dados do novo usuário.
   * @returns Usuário criado com senha criptografada.
   */
  @Post('register')
  @ApiOperation({ summary: 'Registrar um novo usuário' })
  @ApiResponse({
    status: 201,
    description: 'Usuário registrado com sucesso.',
    type: User,
  })
  @ApiResponse({ status: 400, description: 'Erro ao registrar o usuário.' })
  async register(@Body() user: Partial<User>): Promise<User> {
    return this.authService.register(user);
  }
}
