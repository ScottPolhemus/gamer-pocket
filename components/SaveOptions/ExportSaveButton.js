import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import Button from '@material-ui/core/Button'

import { createDataUrl } from '../../lib/file'
import { usePlayer } from '../../lib/player'

const ExportSaveButton = () => {
  const anchorRef = useRef()
  const [ fileHash, setFileHash ] = useState('')
  const { currentGame, getSRAM } = usePlayer()

  // On click export, perform POST request to upload save and store hash
  const onClickExport = async (event) => {
    event.stopPropagation()

    const sram = await getSRAM()
    const data = await createDataUrl(sram)
    const body = new FormData()

    body.append('data', data)

    const response = await fetch('/api/download', {
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
      <Button
        fullWidth
        variant="contained"
        onClick={onClickExport}
      >Export Save File</Button>
      {fileHash && (
        <a
          onClick={(event) => event.stopPropagation()}
          href={`/api/download?name=${currentGame}.sav&hash=${fileHash}`}
          ref={anchorRef}
          style={{display: 'none'}}
        >Download</a>
      )}
    </>
  )
}

export default ExportSaveButton
