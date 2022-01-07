import React, {useState} from 'react';
import './App.css';
import {filterType, TodoList} from './TodoList';
import {v1} from 'uuid';


function App() {
  let [todos, setTodos] = useState([
    {id: v1(), title: 'English', isDone: false},
    {id: v1(), title: 'Html', isDone: true},
    {id: v1(), title: 'Css', isDone: true},
    {id: v1(), title: 'React', isDone: true},
  ]);
  
  let [filter, setFilter] = useState("All")
  
  const removeTask = (id: string) => {
    todos = todos.filter(t => t.id != id)
    setTodos([...todos])
  }
  
  const changeFilter = (value: filterType) => {
    setFilter(value)
  }
  
  let filteredTasks = todos
  if(filter === "Active") {
    filteredTasks = filteredTasks.filter(t => !t.isDone)
  }
  if(filter === "Finished") {
    filteredTasks = filteredTasks.filter(t=> t.isDone)
  }
  
  const addTask = (title: string) => {
    let task = {id: v1(), title: title, isDone: false}
    setTodos([...todos, task])
    console.log("task ++++")
  }
  
  return (
    <div className="App">
      <TodoList title={'What to learn'} tasks={filteredTasks} taskRemover={removeTask} filteredTasks={changeFilter} addTask={addTask}/>
    </div>
  );
}

export default App