import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateTaskDTO {
  @ApiProperty({ description: 'description for the task' })
  @IsNotEmpty()
  description: string;

  @ApiProperty({ description: 'project id for register task' })
  @IsNotEmpty()
  projectId: number;
}
