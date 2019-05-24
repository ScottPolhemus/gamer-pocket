import React, { useContext } from 'react'

import { stringToArrayBuffer, fromTypedArray } from '../../lib/file'
import { usePlayer } from '../../lib/player'
import FileInput from '../FileInput'

const ImportSaveButton = () => {
  const {
    playerRef,
    restart,
    setSRAM
  } = usePlayer()

  return (
    <FileInput
      label="Import Save File"
      accept=".sav"
      onChange={(file) => {
        const saveBuffer = stringToArrayBuffer(file)
        const save = fromTypedArray(new Uint8Array(saveBuffer))

        if (window.confirm(`Replace current save file?`)) {
          setSRAM(save).then(restart)
        }
      }}
    />
  )
}

export default ImportSaveButton
