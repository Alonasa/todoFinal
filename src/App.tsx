import React, {useState} from 'react';
import './App.css';
import {TodoList} from './TodoList';


function App() {
  let [todos, setTodos] = useState([
    {id: 0, title: 'English', isDone: false},
    {id: 1, title: 'Html', isDone: true},
    {id: 2, title: 'Css', isDone: true},
    {id: 3, title: 'React', isDone: true},
  ]);
  
  const removeTask = (id: number) => {
    todos = todos.filter(t => t.id != id)
    console.log(todos)
    setTodos([...todos])
  }
  
  return (
    <div className="App">
      <TodoList title={'What to learn'} tasks={todos} taskRemover={removeTask}/>
    </div>
  );
}

export default App