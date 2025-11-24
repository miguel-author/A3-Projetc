import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { TaskService } from '../service/task.service';
import { TaskDTO } from '../DTO/task.DTO';
import { JwtAuthGuard } from '../../auth/auth.guard';

@ApiTags('Tasks')
@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @ApiOperation({ summary: 'Criar nova tarefa' })
  create(@Req() req, @Body() dto: TaskDTO) {
    const userId = req.user.userId; // 🔥 Agora correto
    return this.taskService.create(userId, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as tarefas do usuário logado' })
  findAll(@Req() req) {
    const userId = req.user.userId;
    return this.taskService.findAll(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar tarefa pelo ID' })
  findById(@Req() req, @Param('id') id: string) {
    const userId = req.user.userId;
    return this.taskService.findById(id, userId);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar tarefa' })
  update(@Req() req, @Param('id') id: string, @Body() dto: Partial<TaskDTO>) {
    const userId = req.user.userId;
    return this.taskService.update(id, userId, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Excluir tarefa' })
  remove(@Req() req, @Param('id') id: string) {
    const userId = req.user.userId;
    return this.taskService.remove(id, userId);
  }
}
