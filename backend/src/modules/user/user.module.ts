import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from 'src/config/database/database.module';
import { repositoryProviders } from 'src/config/database/repository.providers';

@Module({
  imports: [DatabaseModule],
  providers: [UserService, ...repositoryProviders],
  controllers: [UserController],
})
export class UserModule {}
