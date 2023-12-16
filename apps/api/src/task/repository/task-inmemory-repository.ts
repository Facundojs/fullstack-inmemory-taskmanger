import { Injectable, Provider } from '@nestjs/common';
import { TaskRepository } from '.';
import { ITask } from 'helper';

@Injectable()
class TaskInmemoryRepository implements TaskRepository {
  private readonly tasks: ITask[] = [];
  private nextId = 1;

  async list(): Promise<ITask[]> {
    return this.tasks.sort((a, b) => b.id - a.id);
  }

  async create(task: ITask): Promise<ITask> {
    task.id = this.nextId;
    this.nextId++;
    this.tasks.push(task);
    return task;
  }

  async remove(id: number): Promise<ITask> {
    const task = this.tasks.find((task) => task.id === id);
    this.tasks.splice(this.tasks.indexOf(task), 1);
    return task;
  }
}

export const TaskRepositoryProvider: Provider = {
  useClass: TaskInmemoryRepository,
  provide: 'TaskRepository',
};
