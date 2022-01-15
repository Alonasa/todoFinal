import React, {useState} from 'react';
import './App.css';
import {filterType, tasksStateType, TodoList, todoListsType} from './TodoList';
import {v1} from 'uuid';
import AddItemForm from './AddItemForm';


function App() {
  let todolistID1 = v1();
  let todolistID2 = v1();
  
  let [todoLists, setTodolists] = useState<Array<todoListsType>>([
    {id: todolistID1, title: 'What to do', filter: 'All'},
    {id: todolistID2, title: 'What to Buy', filter: 'All'},
  ])
  
  let [todos, setTodos] = useState<tasksStateType>({
    [todolistID1]: [
      {id: v1(), title: 'English', isDone: false},
      {id: v1(), title: 'Html', isDone: true},
      {id: v1(), title: 'Css', isDone: true},
      {id: v1(), title: 'React', isDone: true},
    ],
    [todolistID2]: [
      {id: v1(), title: 'English2', isDone: false},
      {id: v1(), title: 'Html2', isDone: true},
      {id: v1(), title: 'Css2', isDone: true},
      {id: v1(), title: 'React2', isDone: true},
    ]
  });
  
  const removeTask = (tlId: string, id: string) => {
    setTodos({...todos, [tlId]: todos[tlId].filter(t => t.id != id)})
  }
  
  const changeFilter = (id: string, value: filterType) => {
    setTodolists(todoLists.map(t => t.id === id ? {...t, filter: value} : t))
  }
  
  const addTask = (tlId: string, title: string) => {
    let task = {id: v1(), title: title, isDone: false}
    setTodos({...todos, [tlId]: [task, ...todos[tlId]]})
  }
  
  const removeTodolist = (tlId: string) => {
    setTodolists(todoLists.filter(tl=> tl.id !== tlId))
    delete todos[tlId]
  }
  
  const changeStatus = (tlId: string, tId: string, isDone: boolean) => {
    setTodos({
      ...todos,
      [tlId]: todos[tlId].map(t => t.id === tId ? {...t, isDone} : t)
    })
  }
  
  const addTodolistHandler = (title: string) => {
    const todolistId = v1()
    let todolist: todoListsType = {id: todolistId, title: title, filter: 'All'}
    setTodolists([...todoLists, todolist])
    setTodos({...todos, [todolistId]: []})
  }
  
  const updateTask = (id: string, tlId: string, title: string) => {
    setTodos({
      ...todos,
      [tlId]: todos[tlId].map(t => t.id === id ? {...t, title: title} : t)
    })
  }
  
  const updateTodolist = (tlId: string, title: string) => {
    setTodolists(todoLists.map(m => m.id === tlId ? {...m, title: title} : m))
  }
  
  return (
    <div className="App">
      <AddItemForm addTask={addTodolistHandler}/>
      {todoLists.map(tl => {
        let filteredTasks = todos[tl.id]
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
                    removeTodolist={removeTodolist}
                    updateTask={updateTask}
                    updateTodolist={updateTodolist}
          />
        )
      })}
    </div>
  );
}

export default App