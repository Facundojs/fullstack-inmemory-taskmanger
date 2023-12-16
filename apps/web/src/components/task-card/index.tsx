import './index.css';

import { useTasks } from '../../hooks/use-tasks';
import { ITask } from 'helper';

interface Props {
  task: ITask;
}

export const TaskCard = ({ task }: Props) => {
  const { removeTask } = useTasks()

  return (
    <div className="task">
      <p>{task.id}</p>
      <p className="task-label">{task.title}</p>
      <button className="remove-btn" onClick={() => removeTask(task.id)}>
        Remove
      </button>
    </div>
  )
}