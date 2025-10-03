import { Controller, Post, Body, BadRequestException } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from "@nestjs/swagger";
import {
  LoginDto,
  loginSuccessResponse,
  loginFailureDto,
} from "../respostas_dto/login.response.dto";
import { AuthService } from "./auth.service";

@Controller("auth")
@ApiTags("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("login")
  @ApiOperation({ summary: "Login de usuário" })
  @ApiBody({ type: LoginDto })
  @ApiResponse(loginSuccessResponse)
  @ApiResponse(loginFailureDto)
  async login(@Body() loginDto: {email: string, password: string}) {
    const user = await this.authService.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new BadRequestException('Credenciais inválidas');
    }
    return this.authService.login(user);
  }
}
