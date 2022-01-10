import React, {useState} from 'react';
import './App.css';
import {filterType, TodoList, todoListsType} from './TodoList';
import {v1} from 'uuid';


function App() {
  let todolistID1 = v1();
  let todolistID2 = v1();
  
  let [todoLists, setTodolists] = useState<Array<todoListsType>>([
    {id: v1(), title: 'What to do', filter: 'All'},
    {id: v1(), title: 'What to Buy', filter: 'All'},
  ])
  
  let [todos, setTodos] = useState({
    [todolistID1]:[
    {id: v1(), title: 'English', isDone: false},
    {id: v1(), title: 'Html', isDone: true},
    {id: v1(), title: 'Css', isDone: true},
    {id: v1(), title: 'React', isDone: true},
  ],
    [todolistID2]:[
      {id: v1(), title: 'English2', isDone: false},
      {id: v1(), title: 'Html2', isDone: true},
      {id: v1(), title: 'Css2', isDone: true},
      {id: v1(), title: 'React2', isDone: true},
    ]
});
  
  const removeTask = (id: string) => {
    todos = todos.filter(t => t.id != id)
    setTodos([...todos])
  }
  
  const changeFilter = (id: string, value: filterType) => {
    setTodolists(todoLists.map(t => t.id === id ? {...t, filter: value} : t))
  }
  
  const addTask = (title: string) => {
    let task = {id: v1(), title: title, isDone: false}
    setTodos([task, ...todos])
  }
  
  const changeStatus = (tId: string, isDone: boolean) => {
    let task = todos.find(t => t.id === tId)
    if (task) {
      task.isDone = isDone
    }
    setTodos([...todos])
  }
  
  return (
    <div className="App">
      {todoLists.map(tl => {
        let filteredTasks = todos
        if (tl.filter === 'Active') {
          filteredTasks = filteredTasks.filter(t => !t.isDone)
        }
        if (tl.filter === 'Finished') {
          filteredTasks = filteredTasks.filter(t => t.isDone)
        }
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