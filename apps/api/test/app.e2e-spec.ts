import { INestApplication, ValidationPipe } from '@nestjs/common';
import { TaskRepository } from './../src/task/repository';
import { TaskModule } from './../src/task/task.module';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './../src/app.module';
import { agent } from 'supertest';

const MOCK_TASK = { title: 'Test task' };

describe('TaskController (e2e)', () => {
  let app: INestApplication;
  let taskRepository: TaskRepository;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, TaskModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
    taskRepository = app.get<TaskRepository>('TaskRepository');
  });

  describe('/tasks (POST)', () => {
    it('should fail when no title is provided', () => {
      return agent(app.getHttpServer()).post('/tasks').send({}).expect(400);
    });

    it('should create correctly', () => {
      return agent(app.getHttpServer())
        .post('/tasks')
        .send(MOCK_TASK)
        .expect(201);
    });
  });

  describe('/tasks (GET)', () => {
    it('Should return all results and status ok', () => {
      return agent(app.getHttpServer()).get('/tasks').expect(200);
    });
  });

  describe('/tasks/:id (DELETE)', () => {
    it('should 404 when not exist', () => {
      return agent(app.getHttpServer()).delete('/tasks/999').expect(404);
    });

    it('should remove correctly and return', async () => {
      jest
        .spyOn(taskRepository, 'remove')
        .mockResolvedValue({ ...MOCK_TASK, id: 1 });

      return agent(app.getHttpServer())
        .delete(`/tasks/1`)
        .expect(200)
        .expect(await taskRepository.remove(1));
    });
  });

  describe('/tasks (GET)', () => {
    it('Should return all results and status ok', () => {
      return agent(app.getHttpServer()).get('/tasks').expect(200).expect([]);
    });
  });
});
