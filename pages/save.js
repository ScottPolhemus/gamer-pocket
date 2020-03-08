import React from 'react'
import Head from 'next/head'

import LoadingGate from '../components/LoadingGate'
import SaveOptions from '../components/SaveOptions'
import FooterActions, { BackButton } from '../components/FooterActions'

const SavePage = () => (
  <>
    <Head>
      <title>Gamer Pocket - Save</title>
    </Head>
    <LoadingGate>
      <SaveOptions />
      <FooterActions>
        <BackButton />
      </FooterActions>
    </LoadingGate>
  </>
)

export default SavePage
