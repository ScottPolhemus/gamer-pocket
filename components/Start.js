import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'
import styled from 'styled-components'
import Button from '@material-ui/core/Button'
import Fab from '@material-ui/core/Fab'
import SettingsIcon from '@material-ui/icons/Settings'

import { PlayerContext } from '../lib/player'
import FileInput from './FileInput'

const InputContainer = styled.div`
  flex: 1;
`

const StartButton = styled(Button).attrs({
  color: 'primary',
  variant: 'contained',
  fullWidth: true
})`
  margin-top: 1rem;
`

const SettingsButton = styled(Fab).attrs({
  color: 'primary',
})``

const SettingsButtonContainer = styled.div`
  text-align: right;
`

const Start = () => {
  const router = useRouter()
  const [{currentGame = ''}] = useCookies()
  const {
    gameboy,
    game,
    start,
    resume,
    ROMImage,
    setROMImage,
    hasFreeze
  } = useContext(PlayerContext)
  
  return (
    <>
      <InputContainer>
        <FileInput accept=".gb,.gbc" label="Select file" onChangeFile={setROMImage} />
        {!!ROMImage.length && (
          <StartButton onClick={start}>Start {game}</StartButton>
        )}
        {hasFreeze && (
          <StartButton onClick={resume}>Resume {currentGame}</StartButton>
        )}
      </InputContainer>
      <SettingsButtonContainer>
        <SettingsButton onClick={() => router.replace('/settings')}>
          <SettingsIcon />
        </SettingsButton>
      </SettingsButtonContainer>
    </>
  )
}

export default Start