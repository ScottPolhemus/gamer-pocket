import React from 'react'

import { ControlsProvider } from '../services/controls'
import { PlayerProvider } from '../services/player'
import { SettingsProvider } from '../services/settings'
import AppMenu from './AppMenu'
import Player from './Player'

const App = () => (
  <SettingsProvider>
    <PlayerProvider>
      <ControlsProvider>
        <Player>
          <AppMenu />
        </Player>
      </ControlsProvider>
    </PlayerProvider>
  </SettingsProvider>
)

export default App
