import {tasksStateType} from './TodoList';

export const TaskReducer = (state: tasksStateType, action: GeneralTypes) => {
  switch (action.type) {
    case 'REMOVE-TASK' : {
      return {...state, [action.payload.tlId]: state[action.payload.tlId].filter(t => t.id != action.payload.id)}
    }
  }
}

type GeneralTypes = removeTaskACType

type removeTaskACType = ReturnType<typeof removeTaskAC>


export const removeTaskAC = (tlId: string, id: string) => {
  return {
	type: 'REMOVE-TASK',
	payload: {
	  tlId: tlId,
	  id: id,
	}
  } as const
}