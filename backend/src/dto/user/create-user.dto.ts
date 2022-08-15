import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateUserDTO {
  @ApiProperty({ description: 'name for the user' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'email that identify the user' })
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'password for the user' })
  @IsNotEmpty()
  password: string;

}
