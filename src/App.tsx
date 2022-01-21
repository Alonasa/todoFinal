import React, {useReducer} from 'react';
import './App.css';
import {filterType, TodoList, todoListsType} from './TodoList';
import {v1} from 'uuid';
import AddItemForm from './AddItemForm';
import {
  addTodolistAC,
  changeFilterAC,
  removeTodolistAC,
  TodolistsReducer,
  updateTodolistAC
} from './TodolistsReducer';
import {
  addTaskAC,
  addTaskTodolistAC,
  changeStatusAC,
  removeTaskAC,
  TaskReducer,
  updateTaskAC
} from './TaskReducer';
import {Box, Grid, MuiThemeProvider} from '@material-ui/core';
import {theme} from './theme';


function App() {
  let todolistID1 = v1();
  let todolistID2 = v1();
  
  let [todoLists, todolistsDispatch] = useReducer(TodolistsReducer, [
    {id: todolistID1, title: 'What to do', filter: 'All'},
    {id: todolistID2, title: 'What to Buy', filter: 'All'},
  ])
  
  let [task, taskDispatch] = useReducer(TaskReducer, {
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
    taskDispatch(removeTaskAC(tlId, id))
  }
  
  const changeFilter = (id: string, value: filterType) => {
    todolistsDispatch(changeFilterAC(id, value))
  }
  
  const addTask = (tlId: string, title: string) => {
    taskDispatch(addTaskAC(tlId, title))
  }
  
  const removeTodolist = (tlId: string) => {
    todolistsDispatch(removeTodolistAC(tlId))
    delete task[tlId]
  }
  
  const changeStatus = (tlId: string, tId: string, isDone: boolean) => {
    taskDispatch(changeStatusAC(tlId, tId, isDone))
  }
  
  const addTodolistHandler = (title: string) => {
    const todolistId = v1()
    let todolist: todoListsType = {id: todolistId, title: title, filter: 'All'}
    todolistsDispatch(addTodolistAC(todolist))
    taskDispatch(addTaskTodolistAC(todolistId))
  }
  
  const updateTask = (id: string, tlId: string, title: string) => {
    taskDispatch(updateTaskAC(id, tlId, title))
  }
  
  const updateTodolist = (tlId: string, title: string) => {
    todolistsDispatch(updateTodolistAC(tlId, title))
  }
  
  return (
    <MuiThemeProvider theme={theme}>
      <Box m={15}>
        <Grid container className="App" direction={'row'} wrap={'wrap'}
              align-items={'center'} justifyContent={'space-around'}>
          <AddItemForm addTask={addTodolistHandler}/>
          {todoLists.map(tl => {
            let filteredTasks = task[tl.id]
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
        </Grid>
    
      </Box>
    </MuiThemeProvider>
  );
}

export default App