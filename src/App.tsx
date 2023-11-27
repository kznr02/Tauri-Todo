import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import Item from "./widgets/Item";
import Todo from "./widgets/Todo";
import Form from "./widgets/Form";
import FilterButton from "./widgets/FilterButton";
import { nanoid } from "nanoid";

const FILTER_MAP = {
  All: () => true,
  Active: (task: any) => !task.completed,
  Completed: (task: any) => task.completed,
}

const FILTER_NAME = Object.keys(FILTER_MAP);

function App(props: any) {
  const [tasks, setTasks] = useState(props.tasks);

  const [filter, setFilter] = useState("All");

  const filterList = FILTER_NAME.map((name) => (
    <FilterButton 
      key={name} 
      name={name} 
      isPressed={name === filter} 
      setFilter={setFilter}
    />
  ));

  function toggleTaskCompleted(id: any) {
    const updatedTasks = tasks.map((task: any) => {
      if(id === tasks.id) {
        return {...task, completed: !task.completed};
      }
      return task;
    })
    setTasks(updatedTasks);
  }

  function deleteTask(id: any) {
    const remainingTasks = tasks.filter((task: any) => id !== task.id);
    setTasks(remainingTasks);
  }

  const taskList= tasks
    .filter(FILTER_MAP[filter])
    .map((task: any) => {
      return (
        <Todo 
          name={task.name} 
          completed={task.completed} 
          id={task.id} 
          key={task.id} 
          toggleTaskCompleted={toggleTaskCompleted}
          deleteTask={deleteTask}
          editTask={editTask}
        />
      )
  });

  const taskNoun = taskList.length !== 1 ? "tasks" : "task"

  const headingText = `${taskList.length} ${taskNoun} remaining`

  function addTask(name: any) {
    const newTask = {id: `todo-${nanoid()}`, name, completed: false};
    setTasks([...tasks, newTask]);
  }

  function editTask(id: any, newName: any) {
    const editedTasks = tasks.map((task: any) => {
      if (id === task.id) {
        return {...task, name: newName};
      }
      return task;
    })

    setTasks(editedTasks);
  }

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask} />
      
      <div className="filters btn-group stack-exception">
      {filterList}
      </div>
      <h2 id="list-heading">{headingText}</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading">
        {taskList}
      </ul>
    </div>
  );
}


export default App;
