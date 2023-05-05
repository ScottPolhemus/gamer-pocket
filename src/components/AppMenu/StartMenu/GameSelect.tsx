import * as React from 'react'
import _ from 'lodash'

import { usePlayer } from '../../../services/player'
import { loadFileFromUrl } from '../../../utils/file'
import FileInput from '../FileInput'
import { MenuSelect } from '../AppMenu.css'
import { games } from '../../../games.json'

const builtInGames = games.map(({ name }) => name)

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
        const previousAvailableGames = availableGames
        const games = _.uniq(keys
          .filter((key) => key.indexOf('ROM_') === 0)
          .map((key) => key.slice('ROM_'.length))
          .concat(builtInGames))
        setAvailableGames(games)
        setReady(true)

        if (games.length > previousAvailableGames.length) {
          const newlyAdded = _.difference(games, availableGames) as string[]

          if (newlyAdded.length === 1) {
            setSelectedGame(newlyAdded[0])
          }
        }
      })
    }
  }

  React.useEffect(updateAvailableGames, [initialized])

  React.useEffect(() => {
    if (selectedGame) {
      if (!playerRef.current) {
        throw new Error('Missing GameBoyPlayer instance')
      }

      playerRef.current.getStorageKeys().then((keys) => {
        if (keys.includes(`ROM_${selectedGame}`)) {
          playerRef.current?.loadROM(selectedGame).then(openROM)
        } else {
          if (builtInGames.includes(selectedGame)) {
            const { url } = games.find(({name}) => name == selectedGame)
            loadFileFromUrl(url).then((file) => {
              openROM(file).then(updateAvailableGames)
            })
          }
        }
      })
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
