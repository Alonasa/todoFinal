import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type propsType = {
  addTask: (title: string)=> void
}

const AddItemForm = (props: propsType) => {
  const [title, setTitle] = useState('')
  const [error, setError] = useState('')
  
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
  
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
	setTitle(e.currentTarget.value)
  }
  return (
	<div className={"addInput"}>
	  <input type="text" value={title}
			 onChange={onChangeHandler}
			 onKeyPress={onKeyHandler}/>
	  {error ? <span className="error__message">{error}</span> : ''}
	  <button onClick={addTask}>+</button>
	</div>
  );
};

export default AddItemForm;