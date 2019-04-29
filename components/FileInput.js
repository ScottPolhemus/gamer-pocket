import React, { useRef } from 'react'
import styled from 'styled-components'
import Button from '@material-ui/core/Button'

import { readFileFromInput } from '../lib/file'
import Input from './Input'

const HiddenInput = styled.input`
  display: none;
`

const FileInput = ({onChangeFile, label, accept}) => {
  const inputRef = useRef()
  
  const onClick = (event) => {
    inputRef.current.click()
  }
  
  const onChange = (event) =>
    readFileFromInput(event.target)
      .then(onChangeFile)
  
  return (
    <div onClick={event => event.stopPropagation()}>
      <Button fullWidth variant="contained" onClick={onClick}>{label}</Button>
      <HiddenInput
        type="file"
        accept={accept}
        ref={inputRef}
        onChange={onChange}
      />
    </div>
  )
}

export default FileInput