import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersService } from '../service/users.service';
import { UserDTO } from '../DTO/user.DTO';

/**
 * Controller responsável pelas rotas relacionadas ao Usuário.
 */
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo usuário' })
  create(@Body() dto: UserDTO) {
    return this.usersService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os usuários' })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id') 
  @ApiOperation({ summary: 'Buscar usuário pelo ID' })
  findById(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar usuário existente' })
  update(@Param('id') id: string, @Body() dto: Partial<UserDTO>) {
    return this.usersService.update(id, dto);
  } 

  @Delete(':id')
  @ApiOperation({ summary: 'Excluir usuário pelo ID' })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
