import './styles.css';

import { TaskForm } from './components/task-form';
import { TaskCard } from './components/task-card';
import { useTasks } from './hooks/use-tasks';
import { useMemo } from 'react';

function App() {
  const { tasks, loading } = useTasks()

  const TasksMemo = useMemo(() => {
    if (loading) return 'Cargando...'

    if (!tasks?.length) return 'No hay tareas'

    return tasks?.map((task, i) => <TaskCard task={task} key={i}/>)
  }, [tasks, loading])

  return (
    <div className="App">
      <h1 className="title">Todo List</h1>
      <TaskForm/>
      <div className="tasks">
        {TasksMemo}
      </div>
    </div>
  );
}

export default App
