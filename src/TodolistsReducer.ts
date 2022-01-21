import {filterType, todoListsType} from './TodoList';

export const TodolistsReducer = (state: Array<todoListsType>, action: GeneralType) => {
  switch (action.type) {
	case 'CHANGE-FILTER': {
      return state.map(t => t.id === action.payload.id ? {...t, filter: action.payload.value} : t)
	}
	case 'REMOVE-TODOLIST': {
	  return state.filter(tl=> tl.id !== action.payload.tlId)
	}
	case 'ADD-TODOLIST': {
	  return [action.payload.todolist, ...state]
	}
	
	case 'UPDATE-TODOLIST': {
	  return state.map(m => m.id === action.payload.tlId ? {...m, title: action.payload.title} : m)
	}
	
	default: return state
  }
}

type GeneralType = changeFilterACType | removeTodolistACType | addTodoloistACType | updateTodolistACType


type changeFilterACType = ReturnType<typeof changeFilterAC>
type removeTodolistACType = ReturnType<typeof removeTodolistAC>
type addTodoloistACType = ReturnType<typeof addTodolistAC>
type updateTodolistACType = ReturnType<typeof updateTodolistAC>


export const changeFilterAC = (id: string, value: filterType) => {
  return {
    type: 'CHANGE-FILTER',
	payload : {
      id: id,
	  value: value
	}
  } as const
}

export  const removeTodolistAC = (tlId: string)=> {
  return {
    type: 'REMOVE-TODOLIST',
	payload: {
      tlId: tlId
	}
  
  } as const
}

export const addTodolistAC = (todolist: todoListsType) => {
  return {
	type: 'ADD-TODOLIST',
	payload: {
	  todolist: todolist
	}
  } as const
}

export const updateTodolistAC = (tlId: string, title: string) => {
  return {
    type: 'UPDATE-TODOLIST',
	payload: {
      tlId: tlId,
	  title: title
	}
  
  } as const
}