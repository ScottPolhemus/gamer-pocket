import React from 'react'
import Head from 'next/head'

import LoadingGate from '../components/LoadingGate'
import Settings from '../components/Settings'
import FooterActions, { BackButton } from '../components/FooterActions'

const SettingsPage = () => (
  <>
    <Head>
      <title>Gamer Pocket - Settings</title>
    </Head>
    <LoadingGate>
      <Settings />
      <FooterActions>
        <BackButton />
      </FooterActions>
    </LoadingGate>
  </>
)

export default SettingsPage
