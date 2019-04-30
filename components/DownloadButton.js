import React, { useContext, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

import { createDataUrl } from '../lib/file'
import { PlayerContext } from '../lib/player'

const HiddenDownloadLink = styled.a`
  display: none;
`

const DownloadButton = () => {
  const anchorRef = useRef()
  const [href, setHref] = useState('')
  const { currentGame, getSRAM } = useContext(PlayerContext)
  
  const onClick = async () => {
    const sram = await getSRAM()
    const dataUrl = await createDataUrl(sram)
    setHref(dataUrl)
  }
  
  useEffect(() => {
    if (!href || !anchorRef.current) return
    anchorRef.current.click()
  }, [href])
  
  return (
    <div onClick={(e) => e.stopPropagation()}>
      <button onClick={onClick}>Download</button>
      <HiddenDownloadLink ref={anchorRef} href={href} download={`${currentGame}.sav`}/>
    </div>
  )
}

export default DownloadButton