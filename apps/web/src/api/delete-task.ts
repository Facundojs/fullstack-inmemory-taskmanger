import { env } from '../constants/env';

export async function deleteTask(
  id: number
): Promise<boolean> {
  const response = await fetch(`${env.API_URL}/tasks/${id}`, {
    method: 'DELETE',
  });

  return response.ok;
}