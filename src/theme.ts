import {createTheme} from '@material-ui/core';

export const theme = createTheme({
  palette: {
	primary: {
	  main: '#0D6F6FFF',
	  contrastText: '#fff8e8',
	},
	secondary: {
	  main: '#ff1493',
	  contrastText: '#fff8e8',
	},
	
	error: {
	  main: '#ff1493'
	},
	contrastThreshold: 3,
	tonalOffset: 0.2,
  },
  spacing: 2
})