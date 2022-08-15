import { Inject, Injectable } from '@nestjs/common';
import { CreateTaskDTO } from 'src/dto/task/create-task.dto';
import { ProjectEntity } from 'src/entities/project.entity';
import { TaskEntity } from 'src/entities/task.entity';
import { ProjectNotFoundError, TaskNotFoundError } from 'src/exception/exception';
import { Repository } from 'typeorm';

@Injectable()
export class TaskService {
    constructor(
        @Inject('TASK_REPOSITORY')
        private taskRepository: Repository<TaskEntity>,
        @Inject('PROJECT_REPOSITORY')
        private projectRepository: Repository<ProjectEntity>,
    ) {}

    async getTasks(projectId: number): Promise<TaskEntity[]> {
        return this.taskRepository.find({
            where: {
                active: true,
                project: {
                    id: projectId
                }
            }
        })
    }

    async createTask(new_task: CreateTaskDTO, userId: number): Promise<TaskEntity> {
        const project = await this.projectRepository.findOne({ where: { id: new_task.projectId, user: { id: userId } }})

        if (!project) {
            throw new ProjectNotFoundError()
        }

        const task = new TaskEntity()
        task.description = new_task.description
        task.project = project;
        return this.taskRepository.save(task);
    }

    async checkedTask(id: number): Promise<TaskEntity> {
        const task = await this.taskRepository.findOne({ where: { id: id }})

        if (!task) {
            throw new TaskNotFoundError()
        }

        task.done = true;
        task.dateDone = new Date();
        return this.taskRepository.save(task)
    }

    async deleteTask(id: number): Promise<TaskEntity> {
        const task = await this.taskRepository.findOne({ where: { id: id }})

        if (!task) {
            throw new TaskNotFoundError()
        }

        task.active = false;
        return this.taskRepository.save(task)
    }
}
