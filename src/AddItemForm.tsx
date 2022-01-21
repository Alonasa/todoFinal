import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Box, Button, Grid, Input, MuiThemeProvider} from '@material-ui/core';
import {theme} from './theme';


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
	  <Box mt={10} mb={10} width={250}>
		<Grid container xs={12} spacing={2} direction={'row'} wrap={"wrap"}>
		  <Grid container direction={'row'} wrap={'nowrap'}>
			<Input
			  value={title}
			  onChange={onChangeHandler}
			  onKeyPress={onKeyHandler} id="outlined-basic"
			  placeholder="Add task name here"
			  color="secondary" type="text" autoComplete={'off'}
			/>
			<Button variant="contained" color="secondary"
					onClick={addTask}>+</Button>
		  </Grid>
		  {error ? <span className="error__message">{error}</span> : ''}
		</Grid>
	  </Box>
  );
};

export default AddItemForm;