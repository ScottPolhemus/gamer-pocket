import LoadingGate from '../components/LoadingGate'
import Settings from '../components/Settings'
import FooterActions, { BackButton } from '../components/FooterActions'

const SettingsPage = () => (
  <LoadingGate>
    <Settings />
    <FooterActions>
      <BackButton />
    </FooterActions>
  </LoadingGate>
)

export default SettingsPage
