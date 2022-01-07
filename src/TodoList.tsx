import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type propsType = {
  title: string
  tasks: Array<taskType>
  taskRemover: (id: string) => void
  filteredTasks: (value: filterType) => void
  addTask: (title: string) => void
}

type taskType = {
  id: string
  title: string
  isDone: boolean
}

export type filterType = "All" | "Active" | "Finished";


export const TodoList = (props: propsType) => {
  const [title, setTitle] = useState('')
  const [error, setError] = useState('')
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }
  
  const addTask = () => {
	const trimmedTitle = title.trim();
	if(trimmedTitle) {
	  props.addTask(trimmedTitle)
	  setTitle("")
	}else {setError("***Title is required")}
  }
  
  const onKeyHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError("")
	if(e.key === "Enter") {
	  addTask()
	}
  }
  
  return (
	<div className={'todo'}>
	  <h3>{props.title}</h3>
	  <input type="text" value={title} onChange={onChangeHandler} onKeyPress={onKeyHandler}/>
	  {error ? <span className="error__message">{error}</span> : ""}
	  <button onClick={addTask}>+</button>
	  <ul>
		{props.tasks.map(t =>
		  <li key={t.id}><input type="checkbox" checked={t.isDone}/>
			<span>{t.title}</span>
			<button onClick={() => props.taskRemover(t.id)}>x</button>
		  </li>
		)}
	  </ul>
	  <div>
		<button onClick={() => props.filteredTasks("All")}>All</button>
		<button onClick={() => props.filteredTasks("Active")}>Active</button>
		<button onClick={() => props.filteredTasks("Finished")}>Finished</button>
	  </div>
	</div>
  )
}
