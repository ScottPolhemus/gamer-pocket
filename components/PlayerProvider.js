import React, { useCallback, useEffect, useRef, useState }  from 'react'
import { useCookies } from 'react-cookie'
import { findDOMNode } from 'react-dom'
import _ from 'lodash'
import GameBoy from 'gameboy'

import { PlayerContext } from '../lib/player'

const PlayerProvider = ({
  children
}) => {
  const gameboy = useRef()
  const screenCanvasRef = useRef()
  const [ROMImage, setROMImage] = useState('')
  const [loadedGame, setLoadedGame] = useState('')
  const [{currentGame = ''}, setCookie] = useCookies()
  const setCurrentGame = useCallback((val) => setCookie('currentGame', val), [])
  const [freeze, setFreeze] = useState(null)
  const [freezeScreen, setFreezeScreen] = useState(null)
  const [playing, setPlaying] = useState(false)
  const [paused, setPaused] = useState(false)
  const [pageHidden, setPageHidden] = useState(false)
  const [pageFocused, setPageFocused] = useState(true)
  const [muted, setMuted] = useState(false)
  
  // Initialize gameboy ref
  useEffect(() => {
    gameboy.current = new GameBoy(screenCanvasRef.current)
  }, [])
  
  // Show pause screen on load if freeze is available
  useEffect(() => {
    if (!playing && currentGame && !loadedGame && freeze && freezeScreen) {
      setPaused(true)
    }
  }, [currentGame, loadedGame, freeze, freezeScreen, playing])
  
  // Load ROM and set loadedGame on file change
  useEffect(() => {
    if (ROMImage) {
      gameboy.current.loadROM(ROMImage).then(() => {
        setLoadedGame(gameboy.current.core.name)
      })
    }
  }, [ROMImage])
  
  // Load freeze for loaded or current game
  useEffect(() => {
    const game = currentGame || loadedGame
    
    if (game) {
      gameboy.current.storage.findValue(`FREEZE_${game}`)
        .then((value) => {
          if (value) {
            setFreeze(value)
          } else {
            setFreeze(false)
          }
        })
      gameboy.current.storage.findValue(`FREEZESCREEN_${game}`)
        .then((value) => {
          if (value) {
            setFreezeScreen(value)
          } else {
            setFreezeScreen(false)
          }
        })
    } else {
      setFreeze(false)
      setFreezeScreen(false)
    }
  }, [currentGame, loadedGame, paused, pageHidden, pageFocused])
  
  // Set currentGame on start playing
  useEffect(() => {
    if (playing) {
      setCurrentGame(gameboy.current.core.name)
    }
  }, [playing])
  
  // Update freeze on page focus or visibility change
  useEffect(() => {
    const onVisibilityChange = async () => {
      const hidden = document.visibilityState === 'hidden'
      
      if (hidden && playing && !paused) {
        await gameboy.current.freeze()
      }
      
      setPageHidden(hidden)
    }
    
    const onBlur = async () => {
      await gameboy.current.freeze()
      
      setPageFocused(false)
    }
    
    const onFocus = () => {
      setPageFocused(true)
    }
    
    document.addEventListener('visibilitychange', onVisibilityChange)
    window.addEventListener('blur', onBlur)
    window.addEventListener('focus', onFocus)
    
    return () => {
      document.removeEventListener('visibilitychange', onVisibilityChange)
      window.removeEventListener('blur', onBlur)
      window.removeEventListener('focus', onFocus)
    }
  }, [playing, paused])
  
  const start = useCallback(() => {
    gameboy.current.start()
    setPlaying(true)
    setPaused(false)
  }, [freeze])
  
  const resume = useCallback(() => {
    if (freeze) {
      try {
        gameboy.current.clearLastEmulation()
        console.log("Attempting to run a saved emulation state.")
        gameboy.current.core.returnFromState(freeze)
        gameboy.current.run()
        setPlaying(true)
        setPaused(false)
      } catch (error) {
        console.log(error.message + " file: " + error.fileName + " line: " + error.lineNum);
      } 
    }
  }, [freeze])
  
  const stop = useCallback(() => {
    setROMImage('')
    setCurrentGame('')
    setLoadedGame('')
    setPlaying(false)
    setPaused(false)
  }, [])

  const restart = useCallback(() => {
    const currentROM = gameboy.current.core.getROMImage()

    if (currentROM) {
      gameboy.current.core.reset()
      gameboy.current.loadROM(currentROM).then(start)
    } else {
      resume()
      restart()
    }
  }, [freeze])
  
  const pause = useCallback(() => {
    gameboy.current.pause().then(() => setPaused(true))
  }, [])
  
  const run = useCallback(() => {
    gameboy.current.run()
    setPaused(false)
  }, [])
  
  const mute = useCallback(() => {
    if (!muted) {
      setMuted(true)
      gameboy.current.core.audioHandle.changeVolume(0);
    }
  })

  const unMute = useCallback(() => {
    if (muted) {
      setMuted(false)
      gameboy.current.core.audioHandle.changeVolume(0.5);
    }
  })
  
  const getSRAM = useCallback(async () => {
    return gameboy.current.storage.findValue(`SRAM_${currentGame}`)
  }, [currentGame])
  
  const loadSRAM = useCallback(async (data) => {
    const sram = gameboy.current.core.fromTypedArray(new Uint8Array(data))
    
    return gameboy.current.storage.setValue(`SRAM_${currentGame}`, sram).then(restart)
  }, [currentGame, freeze])
  
  return (
    <PlayerContext.Provider
      value={{
        gameboy,
        screenCanvasRef,
        setROMImage,
        loadedGame,
        setLoadedGame,
        currentGame,
        freeze,
        freezeScreen,
        loadSRAM,
        getSRAM,
        playing,
        setPlaying,
        paused,
        setPaused,
        start,
        resume,
        stop,
        restart,
        pause,
        run,
        muted,
        mute,
        unMute,
      }}
    >
      {children}
    </PlayerContext.Provider>
  )
}

export default PlayerProvider