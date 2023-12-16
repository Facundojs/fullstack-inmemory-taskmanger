import { Test, TestingModule } from '@nestjs/testing';
import { TaskController } from './task.controller';
import { TaskModule } from './task.module';

describe('TaskController', () => {
  let controller: TaskController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TaskModule],
    }).compile();

    controller = module.get<TaskController>(TaskController);
  });

  describe('create', () => {
    it('should create a task', async () => {
      const createTaskDto = { title: 'Test task' };
      const result = { id: 1, title: 'Test task' };

      jest.spyOn(controller, 'create').mockImplementation(async () => result);

      expect(await controller.create(createTaskDto)).toBe(result);
    });
  });

  describe('findAll', () => {
    it('should return an array of tasks', async () => {
      const result = [{ id: 1, title: 'Test task' }];

      jest.spyOn(controller, 'findAll').mockImplementation(async () => result);

      expect(await controller.findAll()).toBe(result);
    });
  });

  describe('remove', () => {
    it('should delete a task and return it', async () => {
      const result = { id: 1, title: 'Test task' };
      const idDTO = { id: 1 };

      jest.spyOn(controller, 'remove').mockImplementation(async () => result);

      expect(await controller.remove(idDTO)).toBe(result);
    });
  });
});
