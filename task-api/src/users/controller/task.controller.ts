import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { TaskDTO } from '../DTO/task.DTO';
import { TaskService } from '../service/task.service';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Tasks } from '../entity/task.entity';

/**
 * Controlador responsável por gerenciar as rotas relacionadas às Tasks.
 * Utiliza o JwtAuthGuard para proteger as rotas com autenticação JWT.
 */
@UseGuards(JwtAuthGuard)
@Controller('task')
@ApiTags('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  /**
   * Cria uma nova Task.
   * @param newTask Dados da nova task (DTO).
   * @returns A task criada.
   */
  @ApiOperation({ summary: 'Criar Task' })
  @ApiResponse({
    status: 201,
    description: 'Task criada com sucesso.',
    type: TaskDTO,
  })
  @Post()
  async create(@Body() newTask: TaskDTO): Promise<Tasks> {
    return this.taskService.create(newTask);
  }

  /**
   * Busca uma task pelo ID.
   * @param id Identificador da task.
   * @returns A task encontrada, ou lança erro se não existir.
   */
  @ApiOperation({ summary: 'Buscar task por ID' })
  @ApiResponse({
    status: 404,
    description: 'Task não encontrada.',
  })
  @ApiResponse({
    status: 200,
    description: 'Task encontrada com sucesso.',
    type: TaskDTO,
  })
  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number): Promise<Tasks> {
    return this.taskService.findById(id);
  }

  /**
   * Retorna todas as tasks cadastradas.
   * @returns Lista de tasks.
   */
  @ApiOperation({ summary: 'Buscar todas as tasks' })
  @ApiResponse({
    status: 200,
    description: 'Tasks encontradas com sucesso.',
    type: [TaskDTO],
  })
  @Get()
  async findAll(): Promise<Tasks[]> {
    return this.taskService.findAll();
  }

  /**
   * Atualiza uma task existente pelo ID.
   * @param id ID da task a ser atualizada.
   * @param task Dados a serem atualizados.
   * @returns Task atualizada.
   */
  @ApiOperation({ summary: 'Atualizar task pelo ID' })
  @ApiResponse({
    status: 200,
    description: 'Task atualizada com sucesso.',
    type: TaskDTO,
  })
  @ApiResponse({
    status: 404,
    description: 'Task não encontrada.',
  })
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() task: Partial<Tasks>,
  ): Promise<Tasks> {
    return this.taskService.update(id, task);
  }

  /**
   * Deleta uma task pelo ID.
   * @param id ID da task a ser removida.
   */
  @ApiOperation({ summary: 'Deletar task pelo ID' })
  @ApiResponse({
    status: 204,
    description: 'Task deletada com sucesso.',
  })
  @ApiResponse({
    status: 404,
    description: 'Task não encontrada.',
  })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTask(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.taskService.deleteTask(id);
  }
}
