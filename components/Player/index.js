import React, { useRef } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import { StylesProvider, ThemeProvider } from '@material-ui/styles'

import { ControlsProvider, controlsConfig } from '../../lib/controls'
import { createTheme } from '../../lib/theme'
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
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>
        <PlayerProvider>
          <ControlsProvider>
            <CssBaseline />
            <BaseStyle color={color} />
            <PlayerContainer color={color}>
              <Screen>{children}</Screen>
              {controlsConfig.map((config) => (
                <Controls key={`controls-${config.group}`} {...config} />)
              )}
            </PlayerContainer>
          </ControlsProvider>
        </PlayerProvider>
      </ThemeProvider>
    </StylesProvider>
  )
}

export default Player
