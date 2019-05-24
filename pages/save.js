import LoadingGate from '../components/LoadingGate'
import SaveOptions from '../components/SaveOptions'
import FooterActions, { BackButton } from '../components/FooterActions'

const SavePage = () => (
  <LoadingGate>
    <SaveOptions />
    <FooterActions>
      <BackButton />
    </FooterActions>
  </LoadingGate>
)

export default SavePage
