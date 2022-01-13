import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import AddItemForm from './AddItemForm';

type propsType = {
  id: string
  title: string
  tasks: Array<taskType>
  taskRemover: (tlId: string,id: string) => void
  filteredTasks: (id: string, value: filterType) => void
  addTask: (tlId: string, title: string) => void
  filter: string
  changeHandler: (tlId: string, tId: string, isDone: boolean) => void
  removeTodolist: (tlId: string)=> void
}

type taskType = {
  id: string
  title: string
  isDone: boolean
}

export type filterType = 'All' | 'Active' | 'Finished';

export type todoListsType = {
  id: string
  title: string
  filter: filterType
}

export type tasksStateType = {
  [key: string]: Array<taskType>
}

export const TodoList = (props: propsType) => {
  const onFilterHandler = (value: filterType) => {
	props.filteredTasks(props.id, value)
  }
  
  const filterStylesHandler = (value: filterType) => {
	return props.filter === value ? 'filter__selected' : ' '
  }
  
  const taskStyleHandler = (t: boolean) => {
	return t ? 'task__checked' : ' '
  }
  
  const AddTaskHandler = (title: string)=> {
	props.addTask(props.id,title)
  }
  
  return (
	<div className={'todo'}>
	  <h3>{props.title}</h3>
	  <button onClick={()=>props.removeTodolist(props.id)}>x</button>
	  <AddItemForm addTask={AddTaskHandler}/>
	  <ul>{
		props.tasks.map(t => {
		  const onClickHandler = () => {
			props.taskRemover(props.id, t.id)
		  }
		  const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
		    props.changeHandler(props.id, t.id, e.currentTarget.checked)
		  }
		  return <li key={t.id} className={taskStyleHandler(t.isDone)}>
			<input type="checkbox" checked={t.isDone}
				   onChange={changeStatusHandler}/>
			<span>{t.title}</span>
			<button onClick={onClickHandler}>x</button>
		  </li>
		})}
	  </ul>
	  <div>
		<button className={filterStylesHandler('All')}
				onClick={() => onFilterHandler('All')}>All
		</button>
		<button className={filterStylesHandler('Active')}
				onClick={() => onFilterHandler('Active')}>Active
		</button>
		<button className={filterStylesHandler('Finished')}
				onClick={() => onFilterHandler('Finished')}>Finished
		</button>
	  </div>
	</div>
  )
}
