import React from 'react'
import Head from 'next/head'

import { usePlayer } from '../lib/player'
import LoadingGate from '../components/LoadingGate'
import SelectGame from '../components/SelectGame'
import PauseMenu from '../components/PauseMenu'
import FooterActions, {
  MuteButton,
  SettingsButton,
  SaveButton,
} from '../components/FooterActions'
const IndexPage = () => {
  const { initialized, loadedGame, currentGame, playing, paused } = usePlayer()

  return (
    <>
      <Head>
        <title>Gamer Pocket</title>
      </Head>
      <LoadingGate>
        {paused ? <PauseMenu /> : <SelectGame />}
        <FooterActions>
          {initialized && <SettingsButton />}
          {initialized && (loadedGame || currentGame) && <SaveButton />}
          {playing && <MuteButton />}
        </FooterActions>
      </LoadingGate>
    </>
  )
}

export default IndexPage
