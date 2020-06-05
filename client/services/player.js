import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { useCookies } from 'react-cookie'
import GameBoyPlayer from 'gameboy'

import { useSettings } from './settings'

export const PlayerContext = createContext()

export const PlayerProvider = ({ children }) => {
  const { screenFilter } = useSettings()

  const playerRef = useRef()
  const screenCanvasRef = useRef()
  const [loadedGame, setLoadedGame] = useState('')
  const [{ currentGame = '', muted = '' }, setCookie] = useCookies()
  const setCurrentGame = useCallback((val) => setCookie('currentGame', val), [])
  const [freeze, setFreeze] = useState(null)
  const [freezeScreen, setFreezeScreen] = useState(null)
  const [initialized, setInitialized] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [paused, setPaused] = useState(false)
  const [pageHidden, setPageHidden] = useState(false)
  const [pageFocused, setPageFocused] = useState(true)

  const setMuted = (val) => {
    if (val) {
      setCookie('muted', 'true')
    } else {
      setCookie('muted', '')
    }
  }

  // Initialize GameBoyPlayer on mount
  useEffect(() => {
    if (!initialized) {
      playerRef.current = new GameBoyPlayer(screenCanvasRef.current, {
        mediaStreamWorkerSrc: `/media-stream-worker.js`,
        soundVolume: muted ? 0 : 0.5,
      })
      setInitialized(true)
    }
  }, [initialized])

  // Find saved freeze + freezeScreen for current or loaded game
  useEffect(() => {
    const game = loadedGame || currentGame

    if (game && !playing) {
      playerRef.current.loadFreeze(game).then((value) => {
        if (value) {
          setFreeze(value)
        } else {
          setFreeze(false)
        }
      })
      playerRef.current.loadFreezeScreen(game).then((value) => {
        if (value) {
          setFreezeScreen(value)
        } else {
          setFreezeScreen(false)
        }
      })
    } else if (!game) {
      setFreeze(false)
      setFreezeScreen(false)
    }
  }, [currentGame, loadedGame, playing])

  // Show pause screen on load if freeze is available
  useEffect(() => {
    if (
      currentGame &&
      !loadedGame &&
      freeze &&
      freezeScreen &&
      !playing &&
      !paused
    ) {
      setPaused(true)
    }
  }, [currentGame, loadedGame, freeze, freezeScreen, playing, paused])

  // Set current game on start playing
  useEffect(() => {
    if (playing) {
      setCurrentGame(playerRef.current.core.name)
    }
  }, [playing])

  // Update volume when muted
  useEffect(() => {
    if (initialized) {
      if (muted) {
        playerRef.current.setVolume(0)
      } else {
        playerRef.current.setVolume(0.5)
      }
    }
  }, [muted])

  // Route to index on start playing or un-pause
  useEffect(() => {
    if (playing && !paused) {
      // router.replace('/')
    }
  }, [playing, paused])

  // Update freeze on page blur or hide events
  const onVisibilityChange = useCallback(async () => {
    const hidden = document.visibilityState === 'hidden'

    if (hidden && playing && !paused) {
      await playerRef.current.autoFreeze()
    }

    setPageHidden(hidden)
  }, [playing, paused])

  const onBlur = useCallback(async () => {
    if (playing && !paused) {
      await playerRef.current.autoFreeze()
    }

    setPageFocused(false)
  }, [playing, paused])

  const onFocus = useCallback(() => {
    setPageFocused(true)
  }, [])

  // Add listeners for visibility and focus events
  useEffect(() => {
    document.addEventListener('visibilitychange', onVisibilityChange)
    window.addEventListener('blur', onBlur)
    window.addEventListener('focus', onFocus)

    return () => {
      document.removeEventListener('visibilitychange', onVisibilityChange)
      window.removeEventListener('blur', onBlur)
      window.removeEventListener('focus', onFocus)
    }
  }, [playing, paused])

  return (
    <PlayerContext.Provider
      value={{
        playerRef,
        screenCanvasRef,
        initialized,
        currentGame,
        setCurrentGame,
        loadedGame,
        setLoadedGame,
        freeze,
        setFreeze,
        freezeScreen,
        setFreezeScreen,
        playing,
        setPlaying,
        paused,
        setPaused,
        muted,
        setMuted,
      }}
    >
      {children}
    </PlayerContext.Provider>
  )
}

export const usePlayer = () => {
  const {
    playerRef,
    screenCanvasRef,
    initialized,
    currentGame,
    setCurrentGame,
    loadedGame,
    setLoadedGame,
    freeze,
    // setFreeze,
    freezeScreen,
    // setFreezeScreen,
    playing,
    setPlaying,
    paused,
    setPaused,
    muted,
    setMuted,
  } = useContext(PlayerContext)

  const openROM = (file) => {
    return playerRef.current.openROM(file).then(() => {
      setLoadedGame(playerRef.current.core.name)
      playerRef.current.saveROM(playerRef.current.core.name, file)
    })
  }

  const start = () => {
    playerRef.current.start()
    setPlaying(true)
    setPaused(false)
  }

  const pause = () => playerRef.current.pause().then(() => setPaused(true))

  const unPause = () => {
    playerRef.current.run()
    setPlaying(true)
    setPaused(false)
  }

  const resume = () => {
    playerRef.current.resume(freeze)
    setPlaying(true)
    setPaused(false)
  }

  const stop = () => {
    setCurrentGame('')
    setLoadedGame('')
    setPlaying(false)
    setPaused(false)
  }

  const restart = () => {
    playerRef.current.core.reset()
    return playerRef.current
      .loadROM(loadedGame || currentGame)
      .then(openROM)
      .then(start)
  }

  const mute = () => setMuted(true)

  const unMute = () => setMuted(false)

  const getSRAM = () => playerRef.current.loadSRAM(loadedGame || currentGame)

  const setSRAM = (sram) => playerRef.current.saveSRAM(currentGame, sram)

  return {
    playerRef,
    screenCanvasRef,
    initialized,
    openROM,
    currentGame,
    loadedGame,
    start,
    pause,
    unPause,
    resume,
    stop,
    restart,
    mute,
    unMute,
    playing,
    paused,
    muted,
    freeze,
    freezeScreen,
    getSRAM,
    setSRAM,
  }
}
