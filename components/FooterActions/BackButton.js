import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Fab from '@material-ui/core/Fab'
import Tooltip from '@material-ui/core/Tooltip'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'

const BackButton = () => {
  const router = useRouter()

  return (
    <Tooltip
      aria-label="Back"
      title="Back"
      placement="top"
    >
      <Fab
        color="primary"
        onClick={(e) => {
          e.stopPropagation()
          router.replace('/')
        }}
      >
        <ArrowBackIcon />
      </Fab>
    </Tooltip>
  )
}

export default BackButton
