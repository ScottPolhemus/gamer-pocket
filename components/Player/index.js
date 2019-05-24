import React, { useRef } from 'react'
import JssProvider from 'react-jss/lib/JssProvider'
import { MuiThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

import { ControlsProvider, controlsConfig } from '../../lib/controls'
import { createTheme } from '../../lib/mui'
import { PlayerProvider } from '../../lib/player'
import { useSettings } from '../../lib/settings'
import Controls from './Controls'
import Screen from './Screen'
import { BaseStyle, PlayerContainer } from './Player.css'

const Player = ({
  children,
  muiContext
}) => {
  const { color } = useSettings()
  const theme = createTheme({color})

  return (
    <JssProvider
      generateClassName={muiContext.generateClassName}
      jss={muiContext.jss}
      registry={muiContext.sheetsRegistry}
    >
      <MuiThemeProvider theme={theme} sheetsManager={muiContext.sheetsManager}>
        <PlayerProvider>
          <ControlsProvider>
            <CssBaseline />
            <BaseStyle color={color} />
            <PlayerContainer>
              <Screen>{children}</Screen>
              {controlsConfig.map((config) => (
                <Controls key={`controls-${config.group}`} {...config} />)
              )}
            </PlayerContainer>
          </ControlsProvider>
        </PlayerProvider>
      </MuiThemeProvider>
    </JssProvider>
  )
}

export default Player
