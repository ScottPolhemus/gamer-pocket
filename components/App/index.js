import React, { useState, useEffect } from 'react'
import Head from 'next/head'

import { useSettings } from '../../lib/settings'
import { getIconData } from '../../lib/icon'
import Player from '../Player'

const GamerPocketApp = ({
  children
}) => {
  const [icon, setIcon] = useState('')
  const { color } = useSettings()
  
  useEffect(() => {
    getIconData(color)
      .then((iconData) => setIcon(iconData))
  }, [color])
  
  return (
    <>
      <Head>
        {!!icon && <link rel="apple-touch-icon" href={icon} />}
      </Head>
      <Player>
        {children}
      </Player>
    </>
  )
}
export default GamerPocketApp