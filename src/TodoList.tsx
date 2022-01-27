import {
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  Grid,
  IconButton
} from '@material-ui/core';
import React, {ChangeEvent} from 'react';
import AddItemForm from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {DeleteOutline} from '@material-ui/icons';

type propsType = {
  id: string
  title: string
  tasks: Array<taskType>
  taskRemover: (tlId: string, id: string) => void
  filteredTasks: (id: string, value: filterType) => void
  addTask: (tlId: string, title: string) => void
  filter: string
  changeHandler: (tlId: string, tId: string, isDone: boolean) => void
  removeTodolist: (tlId: string) => void
  updateTask: (id: string, tlId: string, title: string) => void
  updateTodolist: (tlId: string, title: string) => void
}

type taskType = {
  id: string
  title: string
  isDone: boolean
}

export type filterType = 'All' | 'Active' | 'Finished';

export type todoListsType = {
  id: string
  title: string
  filter: filterType
}

export type tasksStateType = {
  [key: string]: Array<taskType>
}

export const TodoList = (props: propsType) => {
  const onFilterHandler = (value: filterType) => {
	props.filteredTasks(props.id, value)
  }
  
  const filterStylesHandler = (value: filterType) => {
	return props.filter === value ? 'contained' : 'outlined'
  }
  
  const taskStyleHandler = (t: boolean) => {
	return t ? 'task__checked' : ' '
  }
  
  const addTaskHandler = (title: string) => {
	props.addTask(props.id, title)
  }
  
  const updateTaskHandler = (tId: string, title: string) => {
	props.updateTask(tId, props.id, title)
  }
  
  const updateTodolistHandler = (title: string) => {
	props.updateTodolist(props.id, title)
  }
  
  const removeTodolistHandler = () => {
	props.removeTodolist(props.id)
  }
  
  return (
	<Box width={250} mb={20} display={'grid'} flexDirection={'column'}
		 alignItems={'center'}>
	  <Box display={'grid'} alignSelf={'start'}>
		<Grid container xs={12} direction={'row'} wrap={'nowrap'}
			  justifyContent={'space-between'} alignItems={'center'}>
		  <b>
			<EditableSpan title={props.title}
						  callback={(title) => updateTaskHandler}/>
		  </b>
		  <IconButton onClick={removeTodolistHandler} color="primary"
					  size={'small'}>
			<DeleteOutline/>
		  </IconButton>
		</Grid>
		<AddItemForm addTask={addTaskHandler}/>
		<Box width={250} padding={0} display={'grid'} flexDirection={'column'} inlist={'none'}>
		  <ul className={'li-container'}>{
			props.tasks.map(t => {
			  const onClickHandler = () => {
				props.taskRemover(props.id, t.id)
			  }
			  const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
				props.changeHandler(props.id, t.id, e.currentTarget.checked)
			  }
			  return <li key={t.id} className={taskStyleHandler(t.isDone)}>
				<Checkbox checked={t.isDone}
						  onChange={changeStatusHandler} color="primary"/>
				<EditableSpan title={t.title}
							  callback={(title) => updateTodolistHandler(title)}/>
				<IconButton onClick={onClickHandler} color="primary"
							size={'small'}>
				  <DeleteOutline/>
				</IconButton>
			  </li>
			})}
		  </ul>
		</Box>
	  </Box>
	  <Box display={'grid'} alignSelf={'end'}>
		<ButtonGroup>
		  <Button variant={filterStylesHandler('All')}
				  onClick={() => onFilterHandler('All')}
				  color={'primary'}>All</Button>
		  <Button variant={filterStylesHandler('Active')}
				  className={filterStylesHandler('Active')}
				  onClick={() => onFilterHandler('Active')} color={'primary'}>Active
		  </Button>
		  <Button variant={filterStylesHandler('Finished')}
				  className={filterStylesHandler('Finished')}
				  onClick={() => onFilterHandler('Finished')}
				  color={'primary'}>Finished
		  </Button>
		</ButtonGroup>
	  </Box>
	</Box>
  )
}
