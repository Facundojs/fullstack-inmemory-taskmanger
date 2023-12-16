import { TaskRepositoryProvider } from './repository/task-inmemory-repository';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [TaskService, TaskRepositoryProvider],
  controllers: [TaskController],
})
export class TaskModule {}
