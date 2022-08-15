import { ProjectEntity } from 'src/entities/project.entity';
import { TaskEntity } from 'src/entities/task.entity';
import { UserEntity } from 'src/entities/user.entity';
import { DataSource } from 'typeorm';

export const repositoryProviders = [
    {
        provide: 'USER_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(UserEntity),
        inject: ['DATA_SOURCE'],
    },
    {
        provide: 'PROJECT_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(ProjectEntity),
        inject: ['DATA_SOURCE'],
    },
    {
        provide: 'TASK_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(TaskEntity),
        inject: ['DATA_SOURCE'],
    },
];