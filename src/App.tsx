import React, {useState} from 'react';
import './App.css';
import {filterType, TodoList, todoListsType} from './TodoList';
import {v1} from 'uuid';


function App() {
  let [todoLists, setTodolists] = useState<Array<todoListsType>> ([
    {id: v1(), title: 'What to do', filter: 'All'},
    {id: v1(), title: 'What to Buy', filter: 'Finished'},
  ])
  
  let [todos, setTodos] = useState([
    {id: v1(), title: 'English', isDone: false},
    {id: v1(), title: 'Html', isDone: true},
    {id: v1(), title: 'Css', isDone: true},
    {id: v1(), title: 'React', isDone: true},
  ]);
  
  let [filter, setFilter] = useState('All')
  
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
    setTodos([task, ...todos])
  }
  
  const changeStatus = (tId: string, isDone: boolean) => {
    let task = todos.find(t => t.id === tId)
    if(task){
      task.isDone = isDone
    }
    setTodos([...todos])
  }
  
  return (
    <div className="App">
      {todoLists.map(tl => {
        return (
          <TodoList key={tl.id}
                    id={tl.id}
                    title={tl.title}
                    tasks={filteredTasks}
                    taskRemover={removeTask}
                    filteredTasks={changeFilter}
                    addTask={addTask}
                    filter={tl.filter}
                    changeHandler={changeStatus}
          />
        )
      })}
    </div>
  );
}

export default App