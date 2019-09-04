import colorValues from 'color-name'
import { createMuiTheme } from '@material-ui/core/styles'

export const createTheme = ({color}) => {
  const [r,g,b] = colorValues[color];
  
  return createMuiTheme({
    palette: {
      type: 'dark',
      primary: {
        main: `rgb(${r}, ${g}, ${b})`,
        contrastText: color === 'black' ? '#FFFFFF' : '#000000'
      },
    },
    typography: {
      useNextVariants: true,
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"'
      ].join(',')
    }
  })
}