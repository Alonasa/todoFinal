import React, {ChangeEvent, useState} from 'react';

type propsType = {
  title: string
  callback: (title: string) => void
}

export const EditableSpan = ({title, ...props}: propsType) => {
  const [edit, setEdit] = useState(false)
  let [newTitle, setNewTitle] = useState(title)
  
  const editableOn = () => {
	setEdit(true)
  }
  
  const editableOff = () => {
	setEdit(false);
  }
  
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
	setNewTitle(e.currentTarget.value)
  }
  
  return (
	edit
	  ? <input value={newTitle} autoFocus onChange={onChangeHandler}
			   onBlur={editableOff}/>
	  : <span onDoubleClick={editableOn}>{newTitle}</span>
  )
}