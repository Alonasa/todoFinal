import React, {useState} from 'react';
import './App.css';
import {filterType, TodoList} from './TodoList';


function App() {
  let [todos, setTodos] = useState([
    {id: 0, title: 'English', isDone: false},
    {id: 1, title: 'Html', isDone: true},
    {id: 2, title: 'Css', isDone: true},
    {id: 3, title: 'React', isDone: true},
  ]);
  
  let [filter, setFilter] = useState("All")
  
  const removeTask = (id: number) => {
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
  
  return (
    <div className="App">
      <TodoList title={'What to learn'} tasks={filteredTasks} taskRemover={removeTask} filteredTasks={changeFilter}/>
    </div>
  );
}

export default App