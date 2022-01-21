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
  
  const styles = (theme: any) => ({
	textField: {
	  width: '90%',
	  marginLeft: 'auto',
	  marginRight: 'auto',
	  color: 'white',
	  paddingBottom: 0,
	  marginTop: 0,
	  fontWeight: 500
	},
  });
  
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
	setTitle(e.currentTarget.value)
  }
  return (
	<MuiThemeProvider theme={theme}>
	  <Box mt={10} mb={10} width={300}>
		<Grid container spacing={0} direction={'row'} wrap="wrap" alignItems="flex-end">
		  <Grid item>
			<Input
			  value={title}
			  onChange={onChangeHandler}
			  onKeyPress={onKeyHandler} id="outlined-basic"
			  placeholder="Add task name here"
			  color="secondary" type="text"
			/>
		  </Grid>
		  <Grid>
			<Button variant="contained" color="secondary"
					onClick={addTask}>+</Button>
		  </Grid>
		  {error ? <span className="error__message">{error}</span> : ''}
		</Grid>
	  </Box>
	</MuiThemeProvider>
  );
};

export default AddItemForm;