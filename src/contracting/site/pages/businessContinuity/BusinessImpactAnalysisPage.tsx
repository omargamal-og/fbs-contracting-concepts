import BusinessContinuityTemplate from '../../components/inner/BusinessContinuityTemplate'

import { useTranslation } from '../../i18n/useTranslation'

function BusinessImpactAnalysisPage() {
  const t = useTranslation()

  return (
    <BusinessContinuityTemplate
      content={
        t.innerPages.businessContinuity.businessImpactAnalysis
      }
    />
  )
}

export default BusinessImpactAnalysisPage