import { env } from '../constants/env';
import { ITask } from 'helper';

export async function getTasks(): Promise<ITask[]> {
  const response = await fetch(`${env.API_URL}/tasks`);
  const tasks = await response.json();

  return tasks;
}