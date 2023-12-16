import { IsNotEmpty, IsString } from 'class-validator';
import { ICreateTaskDTO } from 'helper';

export class CreateTaskDto implements ICreateTaskDTO {
  @IsNotEmpty()
  @IsString()
  title: string;
}
