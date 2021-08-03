import * as React from 'react'

import { usePlayer } from '../../../services/player'
import { createDataUrl } from '../../../utils/file'
import { MenuButton } from '../AppMenu.css'

const ExportSaveButton = (): JSX.Element => {
  const anchorRef = React.useRef<HTMLAnchorElement | null>(null)
  const [fileURL, setFileURL] = React.useState('')
  const { currentGame, loadedGame, getSRAM } = usePlayer()

  React.useEffect(() => {
    getSRAM()
      .then(createDataUrl)
      .then((dataURL) => {
        setFileURL(dataURL)
      })
  }, [])

  const onClickExport = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation()
      event.preventDefault()

      if (!anchorRef.current) {
        throw new Error('Missing export button anchor')
      }

      anchorRef.current.click()
    },
    []
  )

  const onClickDownload = React.useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.stopPropagation()
    },
    []
  )

  return (
    <>
      <MenuButton onClick={onClickExport} disabled={!fileURL}>
        Export Save File
      </MenuButton>
      <a
        download={`${loadedGame || currentGame}.sav`}
        href={fileURL}
        onClick={onClickDownload}
        ref={anchorRef}
        style={{ display: 'none' }}
      >
        Download
      </a>
    </>
  )
}

export default ExportSaveButton
