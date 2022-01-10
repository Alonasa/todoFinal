import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type propsType = {
  id: string
  title: string
  tasks: Array<taskType>
  taskRemover: (id: string) => void
  filteredTasks: (id: string, value: filterType) => void
  addTask: (title: string) => void
  filter: string
  changeHandler: (tId: string, isDone: boolean) => void
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

export const TodoList = (props: propsType) => {
  const [title, setTitle] = useState('')
  const [error, setError] = useState('')
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
	setTitle(e.currentTarget.value)
  }
  
  const addTask = () => {
	const trimmedTitle = title.trim();
	if (trimmedTitle) {
	  props.addTask(trimmedTitle)
	  setTitle('')
	} else {
	  setError('***Title is required')
	}
  }
  
  const onKeyHandler = (e: KeyboardEvent<HTMLInputElement>) => {
	setError('')
	if (e.key === 'Enter') {
	  addTask()
	}
  }
  
  const onFilterHandler = (value: filterType) => {
	props.filteredTasks(props.id, value)
  }
  
  const filterStylesHandler = (value: filterType) => {
    return props.filter === value ? 'filter__selected' : ' '
  }
  
  const taskStyleHandler = (t: boolean) => {
	return t ? 'task__checked' : ' '
  }
  
  return (
	<div className={'todo'}>
	  <h3>{props.title}</h3>
	  <input type="text" value={title}
			 onChange={onChangeHandler}
			 onKeyPress={onKeyHandler}/>
	  {error ? <span className="error__message">{error}</span> : ''}
	  <button onClick={addTask}>+</button>
	  <ul>{
		props.tasks.map(t => {
		  const onClickHandler = () => {
			props.taskRemover(t.id)
		  }
		  const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
		    props.changeHandler(t.id, e.currentTarget.checked)
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
