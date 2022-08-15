import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { CreateUserDTO } from 'src/dto/user/create-user.dto';
import { UserEntity } from 'src/entities/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(
        private readonly userService: UserService,
    ) {}
    
    @Post()
    @ApiOkResponse({
      type: UserEntity,
      status: 201,
    })
    @ApiOperation({
      summary: 'Create user Endpoint',
      description: 'Post endpoint to create a new user to the system',
    })
    createUser(@Body() user: CreateUserDTO): Promise<UserEntity> {
  
      return this.userService.createUser(user);
    }
}
