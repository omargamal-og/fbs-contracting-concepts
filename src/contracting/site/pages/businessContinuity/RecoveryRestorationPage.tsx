import BusinessContinuityTemplate from '../../components/inner/BusinessContinuityTemplate'

import { useTranslation } from '../../i18n/useTranslation'

function RecoveryRestorationPage() {
  const t = useTranslation()

  return (
    <BusinessContinuityTemplate
      content={
        t.innerPages.businessContinuity.recoveryRestoration
      }
    />
  )
}

export default RecoveryRestorationPage