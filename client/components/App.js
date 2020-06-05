import React from 'react'
import { hot } from 'react-hot-loader/root'
import { CookiesProvider } from 'react-cookie'

import { ControlsProvider } from '../services/controls'
import { PlayerProvider } from '../services/player'
import { SettingsProvider } from '../services/settings'
import AppMenu from './AppMenu'
import Player from './Player'

const App = () => (
  <CookiesProvider>
    <SettingsProvider>
      <PlayerProvider>
        <ControlsProvider>
          <Player>
            <AppMenu />
          </Player>
        </ControlsProvider>
      </PlayerProvider>
    </SettingsProvider>
  </CookiesProvider>
)

export default hot(App)
