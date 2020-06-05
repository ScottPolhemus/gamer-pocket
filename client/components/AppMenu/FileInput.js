import React, { useRef } from 'react'

import { MenuButton, HiddenInput } from './AppMenu.css'
import { readFileInput } from '../../utils/file'

const FileInput = ({ onChange, label, accept }) => {
  const hiddenInputRef = useRef()
  const onClick = (e) => {
    hiddenInputRef.current.click()
  }
  const onChangeFile = (event) => readFileInput(event.target).then(onChange)

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <MenuButton fullWidth variant="contained" onClick={onClick}>
        {label}
      </MenuButton>
      <HiddenInput
        type="file"
        accept={accept}
        ref={hiddenInputRef}
        onChange={onChangeFile}
      />
    </div>
  )
}

export default FileInput
