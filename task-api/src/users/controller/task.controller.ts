import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { TaskService } from '../service/task.service';
import { TaskDTO } from '../DTO/task.DTO';
import { JwtAuthGuard } from '../../auth/auth.guard';

@ApiTags('Tasks') 
// Define categoria no Swagger para agrupar rotas relacionadas às tarefas
@Controller('tasks') 
// Rota base -> todas as rotas começam com /tasks
@UseGuards(JwtAuthGuard) 
// Protege todas as rotas deste controller com autenticação JWT
export class TaskController {
  constructor(private readonly taskService: TaskService) {} 
  // Injeta o serviço responsável pela lógica da tarefa

  @Post()
  @ApiOperation({ summary: 'Criar nova tarefa' }) 
  // Descrição da rota no Swagger
  create(@Req() req, @Body() dto: TaskDTO) {
    // Pega o ID do usuário autenticado do token JWT decodificado
    const userId = req.user.userId; // Token agora armazena userId corretamente

    // Envia para o serviço com o usuário dono da tarefa
    return this.taskService.create(userId, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as tarefas do usuário logado' })
  findAll(@Req() req) {
    const userId = req.user.userId;
    // Retorna apenas tarefas pertencentes ao usuário autenticado
    return this.taskService.findAll(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar tarefa pelo ID' })
  findById(@Req() req, @Param('id') id: string) {
    const userId = req.user.userId;
    // Só retorna a tarefa se pertencer ao usuário
    return this.taskService.findById(id, userId);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar tarefa' })
  update(@Req() req, @Param('id') id: string, @Body() dto: Partial<TaskDTO>) {
    const userId = req.user.userId;
    // Permite atualizar somente os campos enviados no body
    return this.taskService.update(id, userId, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Excluir tarefa' })
  remove(@Req() req, @Param('id') id: string) {
    const userId = req.user.userId;
    // Só remove a tarefa caso ela pertença ao usuário logado
    return this.taskService.remove(id, userId);
  }
}
