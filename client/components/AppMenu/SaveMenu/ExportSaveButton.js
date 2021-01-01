import React, { useCallback, useEffect, useRef, useState } from 'react'

import { usePlayer } from '../../../services/player'
import { createDataUrl } from '../../../utils/file'
import { MenuButton } from '../AppMenu.css'

const ExportSaveButton = () => {
  const anchorRef = useRef()
  const [fileURL, setFileURL] = useState('')
  const { currentGame, loadedGame, getSRAM } = usePlayer()

  useEffect(() => {
    getSRAM()
      .then(createDataUrl)
      .then((dataURL) => {
        setFileURL(dataURL)
      })
  }, [])

  const onClickExport = useCallback((event) => {
    event.stopPropagation()
    event.preventDefault()
    anchorRef.current.click()
  }, [])

  const onClickDownload = useCallback((event) => {
    event.stopPropagation()
  }, []);

  return (
    <>
      <MenuButton
        fullWidth
        variant="contained"
        onClick={onClickExport}
        disabled={!fileURL}
      >
        Export Save File
      </MenuButton>
      <a
        download={`${loadedGame || currentGame}.sav`}
        href={fileURL}
        onClick={onClickDownload}
        ref={anchorRef}
        style={{ display: 'none' }}
      >Download</a>
    </>
  )
}

export default ExportSaveButton
