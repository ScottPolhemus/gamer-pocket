import * as React from 'react'
import useLocalStorageState from 'use-local-storage-state'
import GameBoyPlayer from 'gameboy'

interface PlayerContextValue {
  playerRef: React.MutableRefObject<GameBoyPlayer | null>
  screenCanvasRef: React.RefObject<HTMLCanvasElement | null>
  initialized: boolean
  currentGame: string
  setCurrentGame: (game: PlayerContextValue['currentGame']) => void
  loadedGame: string
  setLoadedGame: React.Dispatch<
    React.SetStateAction<PlayerContextValue['loadedGame']>
  >
  playing: boolean
  setPlaying: React.Dispatch<
    React.SetStateAction<PlayerContextValue['playing']>
  >
  paused: boolean
  setPaused: React.Dispatch<React.SetStateAction<PlayerContextValue['paused']>>
  muted: boolean
  setMuted: React.Dispatch<React.SetStateAction<PlayerContextValue['muted']>>
  freeze: string | null
  setFreeze: React.Dispatch<React.SetStateAction<PlayerContextValue['freeze']>>
  freezeScreen: ImageData | null
  setFreezeScreen: React.Dispatch<
    React.SetStateAction<PlayerContextValue['freezeScreen']>
  >
}

type PrivatePlayerContextValueKeys =
  | 'setLoadedGame'
  | 'setPlaying'
  | 'setPaused'
  | 'setCurrentGame'
  | 'setLoadedGame'
  | 'setMuted'
  | 'setFreeze'
  | 'setFreezeScreen'

type PlayerServiceValue = Omit<
  PlayerContextValue,
  PrivatePlayerContextValueKeys
> & {
  openROM: (file: string) => Promise<void>
  start: () => void
  pause: () => Promise<void>
  unPause: () => void
  resume: () => void
  stop: () => void
  restart: () => Promise<void>
  mute: () => void
  unMute: () => void
  getSRAM: () => Promise<ArrayBufferLike>
  setSRAM: (data: Uint8Array | number[]) => Promise<void>
}

export const PlayerContext = React.createContext<PlayerContextValue | null>(
  null
)

export const PlayerProvider = ({ children }: { children: JSX.Element }): JSX.Element => {
  const playerRef = React.useRef<GameBoyPlayer | null>(null)
  const screenCanvasRef = React.useRef<HTMLCanvasElement | null>(null)
  const [loadedGame, setLoadedGame] = React.useState<string>(``)
  const [currentGame, setCurrentGame] = useLocalStorageState<string>(
    'currentGame',
    ``
  )
  const [muted, setMuted] = useLocalStorageState<boolean>('muted', false)
  const [freeze, setFreeze] = React.useState<string | null>(null)
  const [freezeScreen, setFreezeScreen] = React.useState<ImageData | null>(null)
  const [initialized, setInitialized] = React.useState(false)
  const [playing, setPlaying] = React.useState(false)
  const [paused, setPaused] = React.useState(false)
  const [pageHidden, setPageHidden] = React.useState(false) // eslint-disable-line
  const [pageFocused, setPageFocused] = React.useState(true) // eslint-disable-line

  // Initialize GameBoyPlayer on mount
  React.useEffect(() => {
    if (!initialized) {
      if (!screenCanvasRef.current) {
        throw new Error('Missing screen canvas')
      }

      playerRef.current = new GameBoyPlayer(screenCanvasRef.current, {
        mediaStreamWorkerSrc: `${
          import.meta.env.BASE_URL
        }media-stream-worker.js`,
        soundVolume: muted ? 0 : 0.5,
      })
      setInitialized(true)
    }
  }, [initialized])

  // Find saved freeze + freezeScreen for current or loaded game
  React.useEffect(() => {
    const game = loadedGame || currentGame

    if (game && !playing) {
      if (!playerRef.current) {
        throw new Error('Missing GameBoyPlayer instance')
      }

      playerRef.current.loadFreeze(game).then((value) => {
        if (value) {
          setFreeze(value)
        } else {
          setFreeze(null)
        }
      })
      playerRef.current.loadFreezeScreen(game).then((value) => {
        if (value) {
          setFreezeScreen(value)
        } else {
          setFreezeScreen(null)
        }
      })
    } else if (!game) {
      setFreeze(null)
      setFreezeScreen(null)
    }
  }, [currentGame, loadedGame, playing])

  // Show pause screen on load if freeze is available
  React.useEffect(() => {
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
  React.useEffect(() => {
    if (playing) {
      if (!playerRef.current) {
        throw new Error('Missing GameBoyPlayer instance')
      }

      if (!playerRef.current.core.name) {
        throw new Error('Missing ROM name from GameBoyCore')
      }

      setCurrentGame(playerRef.current.core.name)
    }
  }, [playing])

  // Update volume when muted
  React.useEffect(() => {
    if (initialized) {
      if (!playerRef.current) {
        throw new Error('Missing GameBoyPlayer instance')
      }

      if (muted) {
        playerRef.current.setVolume(0)
      } else {
        playerRef.current.setVolume(0.5)
      }
    }
  }, [muted])

  // Route to index on start playing or un-pause
  React.useEffect(() => {
    if (playing && !paused) {
      // router.replace('/')
    }
  }, [playing, paused])

  // Update freeze on page blur or hide events
  const onVisibilityChange = React.useCallback(async () => {
    const hidden = document.visibilityState === 'hidden'

    if (hidden && playing && !paused) {
      if (!playerRef.current) {
        throw new Error('Missing GameBoyPlayer instance')
      }

      await playerRef.current.autoFreeze()
    }

    setPageHidden(hidden)
  }, [playing, paused])

  const onBlur = React.useCallback(async () => {
    if (playing && !paused) {
      if (!playerRef.current) {
        throw new Error('Missing GameBoyPlayer instance')
      }

      await playerRef.current.autoFreeze()
    }

    setPageFocused(false)
  }, [playing, paused])

  const onFocus = React.useCallback(() => {
    setPageFocused(true)
  }, [])

  // Add listeners for visibility and focus events
  React.useEffect(() => {
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

export const usePlayer = (): PlayerServiceValue => {
  const player = React.useContext(PlayerContext)

  if (!player) {
    throw new Error('Missing player context')
  }

  const {
    playerRef,
    screenCanvasRef,
    initialized,
    currentGame,
    setCurrentGame,
    loadedGame,
    setLoadedGame,
    freeze,
    freezeScreen,
    playing,
    setPlaying,
    paused,
    setPaused,
    muted,
    setMuted,
  } = player

  const openROM = (file: string) => {
    if (!playerRef.current) {
      throw new Error('Missing GameBoyPlayer instance')
    }

    return playerRef.current.openROM(file).then(() => {
      if (!playerRef.current) {
        throw new Error('Missing GameBoyPlayer instance')
      }

      if (!playerRef.current.core.name) {
        throw new Error('Missing ROM name from GameBoyCore')
      }

      setLoadedGame(playerRef.current.core.name)
      playerRef.current.saveROM(playerRef.current.core.name, file)
    })
  }

  const start = () => {
    if (!playerRef.current) {
      throw new Error('Missing GameBoyPlayer instance')
    }

    playerRef.current.start()
    setPlaying(true)
    setPaused(false)
  }

  const pause = () => {
    if (!playerRef.current) {
      throw new Error('Missing GameBoyPlayer instance')
    }

    return playerRef.current.pause().then(() => setPaused(true))
  }

  const unPause = () => {
    if (!playerRef.current) {
      throw new Error('Missing GameBoyPlayer instance')
    }

    playerRef.current.run()
    setPlaying(true)
    setPaused(false)
  }

  const resume = () => {
    if (!playerRef.current) {
      throw new Error('Missing GameBoyPlayer instance')
    }

    if (!freeze) {
      throw new Error('Missing freeze state')
    }

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
    if (!playerRef.current) {
      throw new Error('Missing GameBoyPlayer instance')
    }

    playerRef.current.core.reset()

    const game = loadedGame || currentGame

    if (!game) {
      throw new Error('Missing current game')
    }

    return playerRef.current.loadROM(game).then(openROM).then(start)
  }

  const mute = () => setMuted(true)

  const unMute = () => setMuted(false)

  const getSRAM = () => {
    if (!playerRef.current) {
      throw new Error('Missing GameBoyPlayer instance')
    }

    const game = loadedGame || currentGame

    if (!game) {
      throw new Error('Missing current game')
    }

    return playerRef.current.loadSRAM(game)
  }

  const setSRAM = (data: Uint8Array | number[]) => {
    if (!playerRef.current) {
      throw new Error('Missing GameBoyPlayer instance')
    }

    if (!currentGame) {
      throw new Error('Missing current game')
    }

    return playerRef.current.saveSRAM(currentGame, data)
  }

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
