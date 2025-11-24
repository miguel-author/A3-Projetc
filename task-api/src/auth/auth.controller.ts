import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from '../users/DTO/login.DTO';
import { UserDTO } from '../users/DTO/user.DTO';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Autenticação')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Realizar login e gerar token JWT' })
  @ApiBody({ type: LoginDTO })   // <-- obrigatório pro Swagger entender o formato
  @ApiResponse({ status: 200, description: 'Login bem-sucedido.' })
  @ApiResponse({ status: 401, description: 'Credenciais inválidas.' })
  async login(@Body() credentials: LoginDTO): Promise<{ access_token: string }> {
    const user = await this.authService.validateUser(
      credentials.email,
      credentials.password,
    );

    return this.authService.login(user);
  }

  @Post('register')
@ApiOperation({ summary: 'Registrar um novo usuário' })
@ApiResponse({ status: 201, description: 'Usuário registrado com sucesso.' })
async register(@Body() user: UserDTO) {
  return this.authService.register(user);
}
}
