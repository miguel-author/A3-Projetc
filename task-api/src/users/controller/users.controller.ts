import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { UserDTO } from 'src/users/DTO/user.DTO';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '../entity/user.entity';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('users')
@ApiTags("user")
export class UsersController {
    constructor(private readonly userService: UsersService){}


    @ApiOperation({ summary: "Criar um novo usuário" })
    @ApiResponse({
    status: 201,
    description: "Usuário criado com sucesso.",
    type: UserDTO,
    })
    @ApiResponse({ status:400 , description: "Dados inválidos."})
    @Post()
    async create(@Body() user: UserDTO): Promise<any> {
        return this.userService.create(user);
    }


    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: "Listar todos os usuários"})
    @ApiResponse({
        status: 200,
        description: "Lista de usuários recuperada com sucesso",
        type: [UserDTO],
    })
    @Get()
    async findAll(): Promise<any[]> {
        return this.userService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: "Obter um usuário pelo ID"})
    @ApiResponse({
        status: 200,
        description: "Usuário recuperado com sucesso",
        type: UserDTO,
    })
    @ApiResponse({ status: 404, description: "Usuário não encontrado." })
    @Get(":id")
    async findById(@Param("id") id: number): Promise<any> {
        return this.userService.findById(id);
    }

}
