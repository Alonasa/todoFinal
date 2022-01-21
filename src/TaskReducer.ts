import {tasksStateType} from './TodoList';
import {v1} from 'uuid';

export const TaskReducer = (state: tasksStateType, action: GeneralTypes) => {
  switch (action.type) {
	case 'REMOVE-TASK' : {
	  return {
		...state,
		[action.payload.tlId]: state[action.payload.tlId].filter(t => t.id != action.payload.id)
	  }
	}
	case 'ADD-TASK': {
	  let newTask = {id: v1(), title: action.payload.title, isDone: false}
	  return {
		...state,
		[action.payload.tlId]: [newTask, ...state[action.payload.tlId]]
	  }
	}
	case 'CHANGE-STATUS': {
	  return {
		...state,
		[action.payload.tlId]: state[action.payload.tlId].map(t => t.id === action.payload.tId ? {
		  ...t,
		  isDone: action.payload.isDone
		} : t)
	  }
	}
  }
}

type GeneralTypes = removeTaskACType | addTaskACType | changeStatusACType

type removeTaskACType = ReturnType<typeof removeTaskAC>
type addTaskACType = ReturnType<typeof addTaskAC>
type changeStatusACType = ReturnType<typeof changeStatusAC>


export const removeTaskAC = (tlId: string, id: string) => {
  return {
	type: 'REMOVE-TASK',
	payload: {
	  tlId: tlId,
	  id: id,
	}
  } as const
}

export const addTaskAC = (tlId: string, title: string) => {
  return {
	type: 'ADD-TASK',
	payload: {
	  tlId: tlId,
	  title: title,
	}
  } as const
}

export const changeStatusAC = (tlId: string, tId: string, isDone: boolean) => {
  return {
	type: 'CHANGE-STATUS',
	payload: {
	  tlId: tlId,
	  tId: tId,
	  isDone: isDone,
	}
  } as const
}