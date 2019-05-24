import React from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import Fab from '@material-ui/core/Fab'
import Tooltip from '@material-ui/core/Tooltip'
import ImportExportIcon from '@material-ui/icons/Save'

const SaveOptionsButtonContainer = styled.div`
  margin-left: 8px;
`

const SaveOptionsButton = () => {
  const router = useRouter()

  return (
    <SaveOptionsButtonContainer>
      <Tooltip
        aria-label="Manage Save"
        title="Manage Save"
        placement="top"
      >
        <Fab
          color="primary"
          onClick={(e) => {
            e.stopPropagation()
            router.replace('/save')
          }}
        >
          <ImportExportIcon />
        </Fab>
      </Tooltip>
    </SaveOptionsButtonContainer>
  )
}

export default SaveOptionsButton
