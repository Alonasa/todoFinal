import {filterType, todoListsType} from './TodoList';

export const TodolistsReducer = (state: Array<todoListsType>, action: GeneralType) => {
  switch (action.type) {
	case 'CHANGE-FILTER': {
      return state.map(t => t.id === action.payload.id ? {...t, filter: action.payload.value} : t)
	}
 
	case 'REMOVE-TODOLIST': {
	  return state.filter(tl=> tl.id !== action.payload.tlId)
	}
	
	default: return state
  }
}

type GeneralType = changeFilterACType | removeTodolistACType


type changeFilterACType = ReturnType<typeof changeFilterAC>
type removeTodolistACType = ReturnType<typeof removeTodolistAC>


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