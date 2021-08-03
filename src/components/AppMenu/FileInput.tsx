import * as React from 'react'

import { MenuButton, HiddenInput } from './AppMenu.css'
import { readFileInput } from '../../utils/file'

const FileInput = ({
  onChange,
  label,
  accept,
  inputRef,
}: {
  onChange: (fileContents?: string) => void
  label: string
  accept: string
  inputRef?: React.MutableRefObject<HTMLInputElement | null>
}): JSX.Element => {
  const hiddenInputRef = React.useRef<HTMLInputElement | null>(null)
  const onClick = () => {
    inputRef && inputRef.current
      ? inputRef.current.click()
      : hiddenInputRef.current?.click()
  }
  const onChangeFile = (event: React.ChangeEvent<HTMLInputElement>) =>
    readFileInput(event.target as HTMLInputElement).then((val) => {
      if (val) {
        onChange(val)
      }
    })

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <MenuButton onClick={onClick}>{label}</MenuButton>
      <HiddenInput
        type="file"
        accept={accept}
        ref={inputRef || hiddenInputRef}
        onChange={onChangeFile}
      />
    </div>
  )
}

export default FileInput
