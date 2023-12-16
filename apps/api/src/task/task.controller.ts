import { IdDTO } from '../common/dto/id-dto';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto';
import {
  NotFoundException,
  Controller,
  Delete,
  Param,
  Post,
  Body,
  Get,
} from '@nestjs/common';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }

  @Get()
  findAll() {
    return this.taskService.findAll();
  }

  @Delete(':id')
  async remove(@Param() dto: IdDTO) {
    const deletedTask = await this.taskService.remove(+dto.id);

    if (!deletedTask)
      throw new NotFoundException(`Task with id ${dto.id} not found`);

    return deletedTask;
  }
}
