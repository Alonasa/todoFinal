import React from 'react';

type propsType = {
  title: string
  tasks: Array<taskType>
  taskRemover: (id: number)=> void
}

type taskType = {
  id: number
  title: string
  isDone: boolean
}



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
		<button>All</button>
		<button>Active</button>
		<button>Finished</button>
	  </div>
	</div>
  )
}
