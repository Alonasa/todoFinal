import React from 'react';

type propsType = {
  tasks: Array<taskType>
}

type taskType = {
  id: number
  title: string
  isDone: boolean
}

export const TodoList = (props: propsType) => {
  return (
	<div className={'todo'}>
	  <h3>What to do</h3>
	  <input type="text"/>
	  <button>+</button>
	  <ul>
		{props.tasks.map(t =>
		  <li key={t.id}><input type="checkbox" checked={t.isDone}/><span>{t.title}</span></li>
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
