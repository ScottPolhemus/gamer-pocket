import * as React from 'react'

import { usePlayer } from '../../../services/player'
import FileInput from '../FileInput'
import { MenuSelect } from '../AppMenu.css'

const GameSelect = ({
  selectedGame,
  setSelectedGame,
}: {
  selectedGame: string
  setSelectedGame: React.Dispatch<React.SetStateAction<string>>
}): JSX.Element | null => {
  const { initialized, playerRef, openROM } = usePlayer()
  const [ready, setReady] = React.useState(false)
  const [availableGames, setAvailableGames] = React.useState<string[]>([])
  const hiddenInputRef = React.useRef<HTMLInputElement | null>(null)

  const updateAvailableGames = () => {
    if (initialized) {
      if (!playerRef.current) {
        throw new Error('Missing GameBoyPlayer instance')
      }

      playerRef.current.getStorageKeys().then((keys) => {
        const games = keys
          .filter((key) => key.indexOf('ROM_') === 0)
          .map((key) => key.slice('ROM_'.length))
        setAvailableGames(games)
        setReady(true)
      })
    }
  }

  React.useEffect(updateAvailableGames, [initialized])

  React.useEffect(() => {
    if (selectedGame) {
      if (!playerRef.current) {
        throw new Error('Missing GameBoyPlayer instance')
      }

      playerRef.current.loadROM(selectedGame).then(openROM)
    }
  }, [selectedGame])

  if (!ready) {
    return null
  }

  return (
    <>
      {!!availableGames.length && (
        <MenuSelect
          value={selectedGame}
          onChange={(event) => {
            setSelectedGame(event.target.value || ``)
          }}
        >
          <option key="game-select" value="">
            Select game
          </option>
          {availableGames.map((game) => (
            <option key={`game-${game}`} value={game}>
              {game}
            </option>
          ))}
        </MenuSelect>
      )}
      {!selectedGame && (
        <FileInput
          inputRef={hiddenInputRef}
          accept=".gb,.gbc"
          label="Add ROM File"
          onChange={(file) => {
            if (file) {
              return openROM(file).then(updateAvailableGames)
            }
          }}
        />
      )}
    </>
  )
}

export default GameSelect
