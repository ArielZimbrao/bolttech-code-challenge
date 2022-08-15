import { Inject, Injectable } from '@nestjs/common';
import { CreateProjectDTO } from 'src/dto/project/create-project.dto';
import { ProjectEntity } from 'src/entities/project.entity';
import { UserEntity } from 'src/entities/user.entity';
import { ProjectNotFoundError, UserNotFoundError } from 'src/exception/exception';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectService {
    constructor(
        @Inject('PROJECT_REPOSITORY')
        private projectRepository: Repository<ProjectEntity>,
        @Inject('USER_REPOSITORY')
        private userRepository: Repository<UserEntity>,
    ) {}
    
    async getProjects(userId: number): Promise<ProjectEntity[]> {
        return this.projectRepository.find({
            where: {
                active: true,
                user: {
                    id: userId
                }
            }
        })
    }

    async createProject(new_project: CreateProjectDTO, userId: number): Promise<ProjectEntity> {
        const user = await this.userRepository.findOne({ where: { id: userId }})

        if (!user) {
            throw new UserNotFoundError()
        }

        const project = new ProjectEntity()
        project.name = new_project.name;
        project.user = user;
        return this.projectRepository.save(project)
    }

    async editProject(id: number, new_project: CreateProjectDTO, userId: number): Promise<ProjectEntity> {
        const project = await this.projectRepository.findOne({ where: { id: id, user: { id: userId } }})

        if (!project) {
            throw new ProjectNotFoundError()
        }

        project.name = new_project.name;
        return this.projectRepository.save(project)
    }

    async deleteProject(id: number): Promise<ProjectEntity> {
        const project = await this.projectRepository.findOne({ where: { id: id }})

        if (!project) {
            throw new ProjectNotFoundError()
        }
        
        project.active = false;
        return this.projectRepository.save(project)
    }
}
