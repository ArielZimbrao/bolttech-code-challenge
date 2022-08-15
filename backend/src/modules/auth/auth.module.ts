import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DatabaseModule } from 'src/config/database/database.module';
import { repositoryProviders } from 'src/config/database/repository.providers';

@Module({
  imports: [DatabaseModule],
  providers: [
    AuthService, 
    ...repositoryProviders,
  ],
  controllers: [AuthController]
})
export class AuthModule {}
