import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import Grid from '@material-ui/core/Grid'

import { usePlayer } from '../../lib/player'
import PageTitle from '../PageTitle'
import ExportSaveButton from './ExportSaveButton'
import ImportSaveButton from './ImportSaveButton'

const SaveOptions = () => {
  const router = useRouter()
  const { loadedGame, currentGame } = usePlayer()
  const game = loadedGame || currentGame

  useEffect(() => {
    if (!game) {
      router.replace('/')
    }
  }, [loadedGame, currentGame])

  return (
    <>
      <PageTitle>{game}.sav</PageTitle>
      <Grid container spacing={16}>
        <Grid item xs={12}>
          <ImportSaveButton />
        </Grid>
        <Grid item xs={12}>
          <ExportSaveButton />
        </Grid>
      </Grid>
    </>
  )
}

export default SaveOptions
