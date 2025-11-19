import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { TaskService } from '../service/task.service';
import { TaskDTO } from '../DTO/task.DTO';

/**
 * Controller responsável pelas operações CRUD de Tarefas.
 */
@ApiTags('Tasks')
@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @ApiOperation({ summary: 'Criar uma nova tarefa' })
  create(@Body() dto: TaskDTO) {
  return this.taskService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as tarefas' })
  findAll() {
    return this.taskService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar tarefa pelo ID' })
  findById(@Param('id') id: string) {
    return this.taskService.findById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar tarefa existente' })
  update(@Param('id') id: string, @Body() dto: Partial<TaskDTO>) {
    return this.taskService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover tarefa pelo ID' })
  remove(@Param('id') id: string) {
    return this.taskService.remove(id);
  }
}
