import { ITask } from 'helper';
import { useTasks } from '../hooks/use-tasks';

interface Props {
  task: ITask;
}

export const TaskCard = ({ task }: Props) => {
  const { removeTask } = useTasks()

  return (
    <div className="task">
      <label className="task-label">{task.title}</label>
      <button className="task-button" onClick={() => removeTask(task.id)}>
        Eliminar
      </button>
    </div>
  )
}