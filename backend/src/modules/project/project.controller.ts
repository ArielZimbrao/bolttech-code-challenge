import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from 'src/config/auth.guard';
import { CreateProjectDTO } from 'src/dto/project/create-project.dto';
import { ProjectEntity } from 'src/entities/project.entity';
import { ProjectService } from './project.service';

@UseGuards(AuthGuard)
@Controller('project')
export class ProjectController {
  constructor(
    private readonly projectService: ProjectService
  ) {}

  @Get()
  @ApiOkResponse({
    type: ProjectEntity,
    status: 201,
  })
  @ApiOperation({
    summary: 'Get projects Endpoint',
    description: 'Endpoint to get project to user',
  })
  getProjects(@Req() request): Promise<ProjectEntity[]> {
    const user = request.user;
    return this.projectService.getProjects(user.id);
  }

  @Post()
  @ApiOkResponse({
    type: ProjectEntity,
    status: 201,
  })
  @ApiOperation({
    summary: 'Create project Endpoint',
    description: 'Post endpoint to create a new project to the system',
  })
  createProject(@Req() request, @Body() project: CreateProjectDTO): Promise<ProjectEntity> {
    const user = request.user;
    return this.projectService.createProject(project, user.id);
  }

  @Delete('/:id')
  @ApiOkResponse({
    type: ProjectEntity,
    status: 200,
  })
  @ApiOperation({
    summary: 'Delete project Endpoint',
    description: 'Delete endpoint to remove a project',
  })
  deleteProject(@Param('id') id: number): Promise<ProjectEntity> {
    return this.projectService.deleteProject(id);
  }

  @Put('/:id')
  @ApiOkResponse({
    type: ProjectEntity,
    status: 201,
  })
  @ApiOperation({
    summary: 'Edit project Endpoint',
    description: 'Post endpoint to edit a project to the system',
  })
  editProject(@Req() request, @Param('id') id: number, @Body() project: CreateProjectDTO): Promise<ProjectEntity> {
    const user = request.user;
    return this.projectService.editProject(id, project, user.id);
  }
}
