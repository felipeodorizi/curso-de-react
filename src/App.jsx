import { useEffect, useState } from "react";
import AddTask from './components/AddTask'
import Tasks from './components/Tasks'
import {v4} from 'uuid'

function App() {
 const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem("tasks")) || [])

useEffect(() => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  console.log("Tasks Alterado!");
}, [tasks]);

useEffect (() => {
  const fetchTasks = async () => {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/todos?_limit=10",
      {
        method: "GET",
      }
    );
    const data = await response.json();
    console.log(data);
    setTasks(data);
  };

  // fetchTasks();
  }, []);


  function onTaskClick(taskId) {
    const newTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, isCompleted: !task.isCompleted };
      }
      return task;
    });
    setTasks(newTasks);
  }

  function onDeleteTaskClick(taskId) {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(newTasks);
  }

  /**
   * Fun o chamada quando o usu rio adiciona uma tarefa.
   * Adiciona a tarefa na lista de tarefas.
   * @param {string} title - T tulo da tarefa.
   * @param {string} description - Descri o da tarefa.
   */
  function onAddTaskSubmit(title, description) {
    console.log(v4());
    const newTask = {
      id: v4(),
      title,
      description,
      isCompleted: false,
    };
    setTasks([...tasks, newTask]);
  }

  return (
      <div className='w-screen h-screen flex flex-col justify-center items-center bg-slate-500' >
        <div className='w-[500px] mx-auto space-y-4'>
          <h1 className='text-3xl text-slate-100 font-bold text-center'>Gerenciador de Tarefas</h1>
          <AddTask onAddTaskSubmit={onAddTaskSubmit} /> 
          <Tasks tasks={tasks} onTaskClick={onTaskClick} onDeleteTaskClick={onDeleteTaskClick}  />
        </div>
      </div>

  );
}

export default App
