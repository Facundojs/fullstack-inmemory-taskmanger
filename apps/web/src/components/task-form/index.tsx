import './index.css';

import { useTasks } from '../../hooks/use-tasks';
import { FormEvent, useRef } from 'react';

export const TaskForm = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const { createTask } = useTasks()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData =   new FormData(e.currentTarget);

    const title = formData.get('title') as string;

    if (!title) return;

    await createTask({ title });
    formRef.current?.reset();
  };

  return (
    <>
      <form ref={formRef} onSubmit={handleSubmit} className="form">
        <input
          placeholder="Enter a task"
          className="task-input"
          autoComplete='off'
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