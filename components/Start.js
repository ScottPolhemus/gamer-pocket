import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'
import styled from 'styled-components'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress';
import Fab from '@material-ui/core/Fab'
import SettingsIcon from '@material-ui/icons/Settings'

import { PlayerContext } from '../lib/player'
import FileInput from './FileInput'

const InputContainer = styled.div`
  flex: 1;
`

const LoadingContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
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
  const {
    gameboy,
    loadedGame,
    freeze,
    freezeScreen,
    setROMImage,
    start,
    restart,
    resume,
  } = useContext(PlayerContext)
  
  const onClickStart = () => {
    if (gameboy.current.runInterval) {
      restart()
    } else {
      start()
    }
  }
  
  if (freeze === null || freezeScreen === null) {
    return <LoadingContainer><CircularProgress /></LoadingContainer>
  }
  
  return (
    <>
      <InputContainer>
        <FileInput accept=".gb,.gbc" label="Select file" onChangeFile={setROMImage} />
        {!!loadedGame && (
          <StartButton onClick={onClickStart}>Start {loadedGame}</StartButton>
        )}
        {!!loadedGame && !!freeze && (
          <StartButton onClick={resume}>Resume {loadedGame}</StartButton>
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