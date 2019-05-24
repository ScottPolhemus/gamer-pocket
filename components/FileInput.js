import React, { useRef } from 'react'
import styled from 'styled-components'
import Button from '@material-ui/core/Button'

import { readFileInput } from '../lib/file'

const HiddenInput = styled.input`
  display: none;
`

const FileInput = ({onChange, label, accept}) => {
  const inputRef = useRef()
  const onClick = () => inputRef.current.click()
  const onChangeFile = (event) => readFileInput(event.target).then(onChange)

  return (
    <div onClick={(event) => event.stopPropagation()}>
      <Button
        fullWidth
        variant="contained"
        onClick={onClick}
      >{label}</Button>
      <HiddenInput
        type="file"
        accept={accept}
        ref={inputRef}
        onChange={onChangeFile}
      />
    </div>
  )
}

export default FileInput
