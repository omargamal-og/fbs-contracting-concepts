import BusinessContinuityTemplate from '../../components/inner/BusinessContinuityTemplate'

import { useTranslation } from '../../i18n/useTranslation'

function PlanDevelopmentPage() {
  const t = useTranslation()

  return (
    <BusinessContinuityTemplate
      content={
        t.innerPages.businessContinuity.planDevelopment
      }
    />
  )
}

export default PlanDevelopmentPage