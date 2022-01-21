import {filterType, todoListsType} from './TodoList';

export const TodolistsReducer = (state: Array<todoListsType>, action: GeneralType) => {
  switch (action.type) {
	case 'CHANGE-FILTER': {
      return state.map(t => t.id === action.payload.id ? {...t, filter: action.payload.value} : t)
	}
	default: return state
  }
}

type GeneralType = changeFilterACType


type changeFilterACType = ReturnType<typeof changeFilterAC>


export const changeFilterAC = (id: string, value: filterType) => {
  return {
    type: 'CHANGE-FILTER',
	payload : {
      id: id,
	  value: value
	}
  } as const
}