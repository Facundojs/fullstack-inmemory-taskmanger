import { Inject, Injectable } from '@nestjs/common';
import { TaskRepository } from './repository';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto';

@Injectable()
export class TaskService {
  constructor(
    @Inject('TaskRepository')
    private readonly taskRepository: TaskRepository,
  ) {}

  create(createTaskDto: CreateTaskDto) {
    const task = new Task();

    task.title = createTaskDto.title;

    return this.taskRepository.create(task);
  }

  findAll() {
    return this.taskRepository.list();
  }

  remove(id: number) {
    return this.taskRepository.remove(id);
  }
}
