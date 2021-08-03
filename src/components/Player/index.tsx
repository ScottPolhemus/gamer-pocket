import * as React from 'react'
import { ThemeProvider } from 'styled-components'

import { controlsConfig } from '../../services/controls'
import { useSettings } from '../../services/settings'
import { BaseStyle } from '../../styles/base.css'
import { getIconData } from '../../utils/icon'
import Controls from './Controls'
import Screen from './Screen'
import { PlayerContainer } from './Player.css'

const Player = ({ children }: { children: JSX.Element }): JSX.Element => {
  const [icon, setIcon] = React.useState('')
  const { color } = useSettings()

  React.useEffect(() => {
    getIconData(color).then((iconData) => {
      setIcon(iconData)
    })
  }, [color])

  React.useEffect(() => {
    const existingAppIcon = document.querySelector(`#app-icon`)

    if (existingAppIcon) {
      existingAppIcon.parentNode?.removeChild(existingAppIcon)
    }

    const appIcon = document.createElement('link')

    appIcon.setAttribute('id', 'app-icon')
    appIcon.setAttribute('rel', 'apple-touch-icon')
    appIcon.setAttribute('href', icon)

    document.head.appendChild(appIcon)
  }, [icon])

  return (
    <ThemeProvider theme={{ colorName: color }}>
      <BaseStyle colorName={color} />
      <PlayerContainer>
        <Screen>{children}</Screen>
        {controlsConfig.map((config) => (
          <Controls key={`controls-${config.group}`} {...config} />
        ))}
      </PlayerContainer>
    </ThemeProvider>
  )
}

export default Player
