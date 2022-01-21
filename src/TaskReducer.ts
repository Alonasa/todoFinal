import {tasksStateType} from './TodoList';
import {v1} from 'uuid';

export const TaskReducer = (state: tasksStateType, action: GeneralTypes) => {
  switch (action.type) {
    case 'REMOVE-TASK' : {
      return {...state, [action.payload.tlId]: state[action.payload.tlId].filter(t => t.id != action.payload.id)}
    }
    case 'ADD-TASK': {
      let newTask = {id: v1(), title: action.payload.title, isDone: false}
      return {...state, [action.payload.tlId]: [newTask, ...state[action.payload.tlId]]}
    }
  }
}

type GeneralTypes = removeTaskACType | addTaskACType

type removeTaskACType = ReturnType<typeof removeTaskAC>
type addTaskACType = ReturnType<typeof addTaskAC>

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
      title: title
    }
  } as const
}