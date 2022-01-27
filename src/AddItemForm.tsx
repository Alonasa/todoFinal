import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Box, Grid, IconButton, TextField} from '@material-ui/core';
import {AddBox} from '@material-ui/icons';


type propsType = {
  addTask: (title: string) => void
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
	  <Box mt={10} mb={15} width={250}>
		<Grid container xs={12} spacing={2} direction={'row'} wrap={"wrap"}>
		  <Grid container direction={'row'} wrap={'nowrap'}>
			<TextField
			  variant={'outlined'}
			  value={title}
			  onChange={onChangeHandler}
			  onKeyPress={onKeyHandler} id="outlined-basic"
			  placeholder="Add task name here"
			  color="primary" type="text" autoComplete={'off'}
			  error={!!error}
			  helperText={error}
			/>
			<IconButton color="primary" onClick={addTask}>
			  <AddBox/>
			</IconButton>
		  </Grid>
		</Grid>
	  </Box>
  );
};

export default AddItemForm;