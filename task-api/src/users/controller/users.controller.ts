import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from '../service/users.service';
import { UserDTO } from 'src/users/DTO/user.DTO';
import { JwtAuthGuard } from 'src/auth/auth.guard';

/**
 * Controlador responsável pelas rotas relacionadas a usuários.
 * 
 * Este controller gerencia operações como criação, listagem e busca de usuários.
 * 
 * Todas as rotas estão documentadas no Swagger via decorators do @nestjs/swagger.
 */
@Controller('users')
@ApiTags('Usuários') // Aparece como "Usuários" na documentação Swagger
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  /**
   * Cria um novo usuário.
   * 
   * Rota pública (não requer autenticação).
   * 
   * @param user Dados do usuário no formato UserDTO.
   * @returns Dados do usuário criado.
   */
  @Post()
  @ApiOperation({ summary: 'Criar um novo usuário' })
  @ApiResponse({ status: 201, description: 'Usuário criado com sucesso.', type: UserDTO })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  async create(@Body() user: UserDTO): Promise<UserDTO> {
    return this.userService.create(user);
  }

  /**
   * Lista todos os usuários cadastrados.
   * 
   * Requer autenticação via JWT.
   * 
   * @returns Lista de usuários.
   */
  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Listar todos os usuários' })
  @ApiResponse({ status: 200, description: 'Lista de usuários recuperada com sucesso', type: [UserDTO] })
  async findAll(): Promise<UserDTO[]> {
    return this.userService.findAll();
  }

  /**
   * 🔍 Busca um usuário pelo ID.
   * 
   * Requer autenticação via JWT.
   * 
   * @param id ID numérico do usuário.
   * @returns Usuário encontrado ou exceção 404 se não existir.
   */
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Obter um usuário pelo ID' })
  @ApiResponse({ status: 200, description: 'Usuário recuperado com sucesso', type: UserDTO })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado.' })
  async findById(@Param('id') id: number): Promise<UserDTO> {
    return this.userService.findById(id);
  }
}
