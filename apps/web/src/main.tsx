import { TaskProvider } from './context/task-context.tsx'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <TaskProvider>
    <App />
  </TaskProvider>
)