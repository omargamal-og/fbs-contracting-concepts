import BusinessContinuityTemplate from '../../components/inner/BusinessContinuityTemplate'

import { useTranslation } from '../../i18n/useTranslation'

function LeadershipAccountabilityPage() {
  const t = useTranslation()

  return (
    <BusinessContinuityTemplate
      content={
        t.innerPages.businessContinuity.leadershipAccountability
      }
    />
  )
}

export default LeadershipAccountabilityPage