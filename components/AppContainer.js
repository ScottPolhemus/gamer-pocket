import React from 'react'
import { CookiesProvider, Cookies, useCookies } from 'react-cookie'
import JssProvider from 'react-jss/lib/JssProvider'
import { MuiThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

import { createTheme } from '../lib/mui'
import AppLayout from './AppLayout'
import ControlsProvider from './ControlsProvider'
import PlayerProvider from './PlayerProvider'

const MuiProvider = ({
  children,
  muiClient
}) => {
  const [{
    color = 'rebeccapurple'
  }] = useCookies()
  
  const theme = createTheme({color})
  
  return (
    <JssProvider
      generateClassName={muiClient.generateClassName}
      jss={muiClient.jss}
      registry={muiClient.sheetsRegistry}
    >
      <MuiThemeProvider theme={theme} sheetsManager={muiClient.sheetsManager}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </JssProvider>
  )
}

const AppProvider = ({children}) => (
  <PlayerProvider>
    <ControlsProvider>
      {children}
    </ControlsProvider>
  </PlayerProvider>
)

const AppContainer = ({
  children,
  cookies,
  muiClient
}) => (
  <CookiesProvider cookies={new Cookies(cookies)}>
    <MuiProvider muiClient={muiClient}>
      <AppProvider>
        <AppLayout>
          {children}
        </AppLayout>
      </AppProvider>
    </MuiProvider>
  </CookiesProvider>
)

export default AppContainer