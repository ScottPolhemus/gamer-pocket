import React, { useEffect, useRef, useState } from 'react'

import { usePlayer } from '../../../services/player'
import { createDataUrl } from '../../../utils/file'
import { MenuButton } from '../AppMenu.css'

const ExportSaveButton = () => {
  const anchorRef = useRef()
  const [fileHash, setFileHash] = useState('')
  const { currentGame, loadedGame, getSRAM } = usePlayer()

  // On click export, perform POST request to upload save and store hash
  const onClickExport = async (e) => {
    e.stopPropagation()

    const sram = await getSRAM()
    const data = await createDataUrl(sram)
    const body = new FormData()

    body.append('data', data)

    const response = await fetch('/save', {
      method: 'POST',
      body
    })
    const responseText = await response.text()

    setFileHash(responseText)
  }

  // After receiving hash, trigger click on download link to save file
  useEffect(() => {
    if (fileHash) {
      anchorRef.current.click()
      setFileHash('')
    }
  }, [fileHash])

  return (
    <>
      <MenuButton fullWidth variant="contained" onClick={onClickExport}>
        Export Save File
      </MenuButton>
      {fileHash && (
        <a
          onClick={(e) => e.stopPropagation()}
          href={`/save?name=${loadedGame || currentGame}.sav&hash=${fileHash}`}
          ref={anchorRef}
          style={{ display: 'none' }}
        >
          Download
        </a>
      )}
    </>
  )
}

export default ExportSaveButton
