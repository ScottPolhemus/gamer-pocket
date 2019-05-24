import { create as createJss, SheetsRegistry } from 'jss'
import colorValues from 'color-name'

import { createGenerateClassName, createMuiTheme, jssPreset } from '@material-ui/core/styles'

export const createTheme = ({color}) => {
  const [r,g,b] = colorValues[color];
  return createMuiTheme({
    palette: {
      type: 'dark',
      primary: {
        main: `rgb(${r},${g},${b})`,
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

const createMuiContext = () => ({
  sheetsManager: new Map(),
  sheetsRegistry: new SheetsRegistry(),
  generateClassName: createGenerateClassName(),
  jss: createJss({
    ...jssPreset(),
    insertionPoint: typeof document !== `undefined` ? document.getElementById('client-jss') : null,
  })
})

let muiContext

export default () => {
  if (!process.browser) {
    return createMuiContext()
  }

  if (!muiContext) {
    muiContext = createMuiContext()
  }

  return muiContext
}
