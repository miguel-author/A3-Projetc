import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { FindAllParameters, TaskDTO, UpdateTaskDTO } from '../DTO/task.DTO';
import { TaskService } from '../service/task.service';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Tasks } from '../entity/task.entity';
import { User } from '../entity/user.entity';

@UseGuards(JwtAuthGuard)
@Controller('task')
@ApiTags("task")
export class TaskController {
    constructor(private readonly taskService: TaskService){ }


    @ApiOperation({ summary: "Criar Task" })
    @ApiResponse({
        status: 201,
        description: "Task criaca com sucesso",
        type: TaskDTO,
    })

    // @Post()
    // create(@Body() newTask: TaskDTO): Promise<Tasks> {
    //     return this.taskService.create(newTask);
    // }
    @Post()
    async create(@Body() newTask: TaskDTO){
        return await this.taskService.create(newTask);
    }



    @ApiOperation({ summary: "Buscar task por ID" })
    @ApiResponse({
        status: 400,
        description: "Task não encontrada",
        type: TaskDTO,
    })
    @ApiResponse({
        status: 200,
        description: "Task encontrada com sucesso",
        type: TaskDTO,
    })
    @Get('/:id')
    async findById(@Param('id') id:number) {
        return await this.taskService.findById(id);
    }



    @ApiOperation({ summary: "Buscar todas tasks" })
    @ApiResponse({
        status: 400,
        description: "Tasks não encontradas",
        type: TaskDTO,
    })
    @ApiResponse({
        status: 200,
        description: "Tasks encontradas com sucesso",
        type: TaskDTO,
    })
    @Get()
    async findAll(): Promise<Tasks[]>{
        return this.taskService.findAll();
    }


    @ApiOperation({ summary: "Atualizar task pelo ID" })
    @ApiResponse({
        status: 400,
        description: "Não foi possivel encontar a task pelo ID, logo não foi possivel atualiza-lá",
        type: TaskDTO,
    })
    @ApiResponse({
        status: 200,
        description: "Task atualizada com sucesso",
        type: TaskDTO,
    })
    @Put(":id")
    update(@Param("id", ParseIntPipe) id: number, @Body() task: Partial<Tasks>): Promise<Tasks>{
         return this.taskService.update(+id, task);
    }

//updateTask: UpdateTaskDTO

    @ApiOperation({ summary: "Deletar task pelo ID" })
    @ApiResponse({
        status: 400,
        description: "Não foi possivel localizar a task pelo ID",
        type: TaskDTO,
    })
    @ApiResponse({
        status: 200,
        description: "Task deletada com sucesso",
        type: TaskDTO,
    })
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteTask(@Param('id', ParseIntPipe) id: number): Promise<void>{
         await this.taskService.deleteTask(id);
    }
}
