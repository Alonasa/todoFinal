import {createTheme} from '@material-ui/core';

export const theme = createTheme({
  palette: {
	primary: {
	  main: '#ff1493',
	  contrastText: '#fff8e8',
	},
	secondary: {
	  main: '#6495ed',
	  contrastText: '#fff8e8',
	},
	contrastThreshold: 3,
	tonalOffset: 0.2,
  },
  spacing: 2
})