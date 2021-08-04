import * as React from 'react'

import { usePlayer } from '../../services/player'
import Icon from '../Icon'
import {
  ToggleLabel,
  ToggleInput,
  ToggleText,
  ToggleOutline,
} from './AppMenu.css'

const MuteButton = (): JSX.Element => {
  const { muted, mute, unMute } = usePlayer()

  return (
    <ToggleLabel onClick={(e) => e.stopPropagation()}>
      <ToggleInput
        type="checkbox"
        name="mute"
        checked={!!muted}
        onChange={(e) => {
          if (e.target.checked) {
            mute()
          } else {
            unMute()
          }
        }}
      />
      <ToggleOutline tabIndex={0}>
        <Icon name={muted ? `volume_off` : `volume_up`} />
      </ToggleOutline>
      <ToggleText>Mute</ToggleText>
    </ToggleLabel>
  )
}

export default MuteButton
