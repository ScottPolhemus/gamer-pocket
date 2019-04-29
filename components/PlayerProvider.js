import React, { useCallback, useEffect, useRef, useState }  from 'react'
import { useCookies } from 'react-cookie'
import { findDOMNode } from 'react-dom'
import _ from 'lodash'
import GameBoy from 'gameboy'

import { PlayerContext } from '../lib/player'

const PlayerProvider = ({
  children
}) => {
  const [{
    currentGame = ''
  }, setCookie] = useCookies()
  const setCurrentGame = (val) => setCookie('currentGame', val)
  const [hasFreeze, setHasFreeze] = useState(false)
  const [ROMImage, setROMImage] = useState('')
  const [game, setGame] = useState()
  const [playing, setPlaying] = useState(false)
  const [paused, setPaused] = useState(false)
  const screenCanvasRef = useRef()
  const gameboy = useRef(null)
  
  useEffect(() => {
    gameboy.current = new GameBoy(screenCanvasRef.current)
    
    gameboy.current.storage.findValue(`FREEZE_${currentGame}`)
      .then(() => {
      setHasFreeze(true)
    })
  }, [])
  
  useEffect(() => {
    const onVisibilityChange = async () => {
      if (document.visibilityState === 'hidden' && playing && !paused) {
        await gameboy.current.saveGame()
      }
    }
    
    document.addEventListener('visibilitychange', onVisibilityChange)
    
    return () => {
      document.removeEventListener('visibilitychange', onVisibilityChange)
    }
  })
  
  const onChangeROMImage = async () => {
    if (!ROMImage) { return }

    await gameboy.current.loadROM(ROMImage)
    setGame(gameboy.current.core.name)
  }
  
  useEffect(() => {
    onChangeROMImage()
  }, [ROMImage])
  
  const start = useCallback(() => {
    return gameboy.current.start()
      .then(() => {
        setPlaying(true)
        setPaused(false)
      })
  }, [ROMImage, game])
  
  const resume = useCallback(() => {
    return gameboy.current.openState(`FREEZE_${currentGame}`)
      .then(() => {
        setGame(currentGame)
        setPlaying(true)
        setPaused(false)
      }, [currentGame])
  })
  
  const pause = useCallback(() => {
    return gameboy.current.pause()
      .then(() => {
        setPaused(true)
        setCurrentGame(game)
      })
  }, [game])
  
  const run = useCallback(() => {
    gameboy.current.run()
    setPaused(false)
  }, [])
  
  const getSRAM = useCallback(async () => {
    return gameboy.current.storage.findValue(`SRAM_${game}`)
  }, [game])
  
  const loadSRAM = useCallback(async (data) => {
    const sram = gameboy.current.core.fromTypedArray(new Uint8Array(data))
    
    return gameboy.current.storage.setValue(`SRAM_${game}`, sram)
      .then(async () => {
      // await gameboy.current.loadROM(ROMImage)
      // run()
    })
  }, [game])
  
  return (
    <PlayerContext.Provider
      value={{
        gameboy,
        ROMImage,
        hasFreeze,
        setROMImage,
        loadSRAM,
        getSRAM,
        game,
        playing,
        paused,
        screenCanvasRef,
        start,
        resume,
        pause,
        run
      }}
    >
      {children}
    </PlayerContext.Provider>
  )
}

export default PlayerProvider