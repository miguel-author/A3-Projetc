import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersService } from '../service/users.service';
import { UserDTO } from '../DTO/user.DTO';

/**
 * Controller responsável pelas rotas relacionadas ao Usuário.
 * Aqui ficam apenas regras de entrada e saída.
 * Toda a lógica de negócio permanece no UsersService.
 */
@ApiTags('Users') // Agrupa essas rotas na seção "Users" no Swagger
@Controller('users') // Prefixo base da rota: /users
export class UsersController {
  constructor(private readonly usersService: UsersService) {} 
  // Injeta o serviço onde está a regra de negócio referente ao usuário

  @Post()
  @ApiOperation({ summary: 'Criar um novo usuário' }) 
  // Usa DTO para validar e padronizar o corpo da requisição
  create(@Body() dto: UserDTO) {
    return this.usersService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os usuários' })
  // Rota para buscar todos os usuários registrados
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id') 
  @ApiOperation({ summary: 'Buscar usuário pelo ID' })
  // Recupera o ID pela URL (exemplo: /users/45asd73)
  findById(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar usuário existente' })
  // Usamos Partial<UserDTO> para permitir atualização parcial
  update(@Param('id') id: string, @Body() dto: Partial<UserDTO>) {
    return this.usersService.update(id, dto);
  } 

  @Delete(':id')
  @ApiOperation({ summary: 'Excluir usuário pelo ID' })
  // Deleta o usuário apenas se existir
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
