import React from 'react'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'

import { usePlayer } from '../../lib/player'
import PageTitle from '../PageTitle'

const PauseMenu = () => {
  const { restart, stop } = usePlayer()

  return (
    <>
      <PageTitle>Paused - Tap screen to resume</PageTitle>
      <Grid container spacing={16}>
        <Grid item xs={6}>
          <Button
            variant="contained"
            fullWidth
            onClick={(event) => {
              event.stopPropagation();
              restart();
            }}
          >Restart</Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            variant="contained"
            fullWidth
            onClick={(event) => {
              event.stopPropagation();
              stop();
            }}
          >Change ROM</Button>
        </Grid>
      </Grid>
    </>
  )
}

export default PauseMenu
