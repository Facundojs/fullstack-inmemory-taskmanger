import { ICreateTaskDTO, ITask } from 'helper';
import { env } from '../constants/env';

export async function createTask(
  createTaskDto: ICreateTaskDTO
): Promise<ITask> {
  const response = await fetch(`${env.API_URL}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(createTaskDto),
  });

  const task = await response.json();

  return task;
}