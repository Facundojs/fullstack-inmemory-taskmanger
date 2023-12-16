import { FC, ReactNode, createContext, useEffect, useState } from 'react';
import { createTask } from '../api/create-task';
import { deleteTask } from '../api/delete-task';
import { ICreateTaskDTO, ITask } from 'helper';
import { getTasks } from '../api/get-tasks';

interface TaskContext {
  createTask: (task: ICreateTaskDTO) => Promise<void>;
  removeTask: (id: number) => Promise<void>;
  tasks: null | ITask[];
  loading: boolean;
}

export const TaskContext = createContext<TaskContext>({
  createTask: () => Promise.resolve(),
  removeTask: () => Promise.resolve(),
  loading: false,
  tasks: null,
});

export const TaskProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState<ITask[] | null>(null);

  const loadTasks = async () => {
    setLoading(true);
    if (tasks !== null)
      return;

    const response = await getTasks();

    setTasks(response);
    setLoading(false);
  }

  const createNewTask = async (task: ICreateTaskDTO) => {
    setLoading(true);
    const createdTask = await createTask(task);

    setTasks(p => (p || []).concat(createdTask));
    setLoading(false);
  };

  const removeTask = async (id: number) => {
    setLoading(true);
    const deleted = await deleteTask(id);

    if (deleted)
      setTasks(p => (p || []).filter(t => t.id !== id));

    setLoading(false);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <TaskContext.Provider
      value={{
        createTask: createNewTask,
        removeTask,
        loading,
        tasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}
