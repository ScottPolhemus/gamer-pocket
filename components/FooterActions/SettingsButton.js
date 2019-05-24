import React from 'react'
import { useRouter } from 'next/router'
import Fab from '@material-ui/core/Fab'
import Tooltip from '@material-ui/core/Tooltip'
import SettingsIcon from '@material-ui/icons/Settings'

const SettingsButton = () => {
  const router = useRouter()

  return (
    <Tooltip
      aria-label="Settings"
      title="Settings"
      placement="top"
    >
      <Fab
        color="primary"
        onClick={(e) => {
          e.stopPropagation()
          router.replace('/settings')
        }}
      >
        <SettingsIcon />
      </Fab>
    </Tooltip>
  )
}

export default SettingsButton
