import { ITask } from 'helper';

export interface TaskRepository {
  create(task: ITask): Promise<ITask>;
  remove(id: number): Promise<ITask>;
  list(): Promise<ITask[]>;
}
