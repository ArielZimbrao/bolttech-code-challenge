import { Body, Controller, Delete, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from 'src/config/auth.guard';
import { CheckedTaskDTO } from 'src/dto/task/checked-task.dto';
import { CreateTaskDTO } from 'src/dto/task/create-task.dto';
import { TaskEntity } from 'src/entities/task.entity';
import { TaskService } from './task.service';

@UseGuards(AuthGuard)
@Controller('task')
export class TaskController {
  constructor(
    private readonly taskService: TaskService
  ) {}

  @Get('/project/:id')
  @ApiOkResponse({
    type: TaskEntity,
    status: 200,
  })
  @ApiOperation({
    summary: 'Get tasks Endpoint',
    description: 'Endpoint to get tasks by project',
  })
  getTasks(@Param('id') id: number): Promise<TaskEntity[]> {
    return this.taskService.getTasks(id);
  }

  @Post()
  @ApiOkResponse({
    type: TaskEntity,
    status: 201,
  })
  @ApiOperation({
    summary: 'Create task Endpoint',
    description: 'Post endpoint to create a new task to the project',
  })
  createTask(@Req() request, @Body() task: CreateTaskDTO): Promise<TaskEntity> {
    const user = request.user;
    return this.taskService.createTask(task, user.id);
  }

  @Post('/done')
  @ApiOkResponse({
    type: TaskEntity,
    status: 201,
  })
  @ApiOperation({
    summary: 'Check task Endpoint',
    description: 'Post endpoint to checkd a task to the project',
  })
  checkedTask(@Body() task: CheckedTaskDTO): Promise<TaskEntity> {
    return this.taskService.checkedTask(task.id);
  }

  @Delete('/:id')
  @ApiOkResponse({
    type: TaskEntity,
    status: 200,
  })
  @ApiOperation({
    summary: 'Delete task Endpoint',
    description: 'Delete endpoint to remove a task to the project',
  })
  deleteTask(@Param('id') id: number): Promise<TaskEntity>  {
    return this.taskService.deleteTask(id);
  }
}
