import React from 'react';

type propsType = {
  title: string
  tasks: Array<taskType>
  taskRemover: (id: number) => void
  filteredTasks: (value: filterType) => void
}

type taskType = {
  id: number
  title: string
  isDone: boolean
}

export type filterType = "All" | "Active" | "Finished";

export const TodoList = (props: propsType) => {
  return (
	<div className={'todo'}>
	  <h3>{props.title}</h3>
	  <input type="text"/>
	  <button>+</button>
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
