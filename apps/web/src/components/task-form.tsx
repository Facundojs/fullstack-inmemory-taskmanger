import { useTasks } from '../hooks/use-tasks';
import { FormEvent } from 'react';

export const TaskForm = () => {
  const { createTask } = useTasks()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData =   new FormData(e.currentTarget);

    const title = formData.get('title') as string;

    if (!title) return;

    await createTask({ title });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="form">
        <input
          placeholder="Enter a task"
          className="input"
          name="title"
          type="text"
          required
        />
        <button type="submit" className="add-btn">
          Add new task
        </button>
      </form></>
  )
}