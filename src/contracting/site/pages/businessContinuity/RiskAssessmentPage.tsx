import BusinessContinuityTemplate from '../../components/inner/BusinessContinuityTemplate'

import { useTranslation } from '../../i18n/useTranslation'

function RiskAssessmentPage() {
  const t = useTranslation()

  return (
    <BusinessContinuityTemplate
      content={
        t.innerPages.businessContinuity.riskAssessment
      }
    />
  )
}

export default RiskAssessmentPage