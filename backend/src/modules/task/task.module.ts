import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/config/database/database.module';
import { repositoryProviders } from 'src/config/database/repository.providers';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';

@Module({
  imports: [DatabaseModule],
  controllers: [TaskController],
  providers: [TaskService, ...repositoryProviders]
})
export class TaskModule {}
