import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CheckedTaskDTO {
  @ApiProperty({ description: 'task id for register task' })
  @IsNotEmpty()
  id: number;
}
