import React from 'react';
import './App.css';
import {TodoList} from './TodoList';

const todos = [
  {id: 0, title: "English", isDone: false},
  {id: 1, title: "Html", isDone: true},
  {id: 2, title: "Css", isDone: true},
  {id: 3, title: "React", isDone: true},
]

function App() {
  return (
    <div className="App">
      <TodoList tasks={todos}/>
      <TodoList tasks={todos}/>
    </div>
  );
}

export default App