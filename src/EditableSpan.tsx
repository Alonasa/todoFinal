import React, {ChangeEvent, useState} from 'react';
import {TextField} from '@material-ui/core';

type propsType = {
  title: string
  callback: (title: string) => void
}

export const EditableSpan = ({title, ...props}: propsType) => {
  const [edit, setEdit] = useState(false)
  let [newTitle, setNewTitle] = useState(title)
  const [error, setError] = useState('')
  
  const editableOn = () => {
	setEdit(true)
  }
  
  const editableOff = () => {
	if (newTitle) {
	  setEdit(false);
	} else {
	  setError('Can\'t save empty field')
	}
  }
  
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
	setNewTitle(e.currentTarget.value)
	setError('')
  }
  
  
  return (
	edit
	  ? <TextField variant={'outlined'} color={'secondary'} type={'small'}
				   value={newTitle} autoFocus onChange={onChangeHandler}
				   onBlur={editableOff} error={!!error} helperText={error}/>
	  : <span onDoubleClick={editableOn}>{newTitle}</span>
  )
}