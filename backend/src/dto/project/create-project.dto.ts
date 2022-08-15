import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateProjectDTO {
  @ApiProperty({ description: 'name for the project' })
  @IsNotEmpty()
  name: string;
}
