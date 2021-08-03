import * as React from 'react'

import { usePlayer } from '../../../services/player'
import { stringToArrayBuffer, fromTypedArray } from '../../../utils/file'
import FileInput from '../FileInput'

const ImportSaveButton = () => {
  const { restart, setSRAM } = usePlayer()

  return (
    <FileInput
      label="Import Save File"
      accept=".sav"
      onChange={(file) => {
        if (!file) {
          throw new Error('Save file failed to load')
        }
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
