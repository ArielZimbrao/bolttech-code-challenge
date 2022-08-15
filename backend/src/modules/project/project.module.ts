import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { repositoryProviders } from 'src/config/database/repository.providers';
import { DatabaseModule } from 'src/config/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [ProjectService, ...repositoryProviders],
  controllers: [ProjectController]
})
export class ProjectModule {}
