import { lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import { contractingPath } from './config/site'
import ContractingLayout from './layouts/ContractingLayout'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'

import LanguageProvider from './i18n/LanguageProvider'
import ContractingThemeProvider from './theme/ContractingThemeProvider'


const WhoWeArePage = lazy(() =>
  import('./pages/about/routePages').then((pages) => ({ default: pages.WhoWeArePage })),
)

const ChairmanSpeechPage = lazy(() =>
  import('./pages/about/routePages').then((pages) => ({ default: pages.ChairmanSpeechPage })),
)

const CeoSpeechPage = lazy(() =>
  import('./pages/about/routePages').then((pages) => ({ default: pages.CeoSpeechPage })),
)

const WhyFbsPage = lazy(() =>
  import('./pages/about/routePages').then((pages) => ({ default: pages.WhyFbsPage })),
)

const VisionMissionPage = lazy(() =>
  import('./pages/about/routePages').then((pages) => ({ default: pages.VisionMissionPage })),
)

const CoreValuesPage = lazy(() =>
  import('./pages/about/routePages').then((pages) => ({ default: pages.CoreValuesPage })),
)

const OurTeamPage = lazy(() =>
  import('./pages/about/routePages').then((pages) => ({ default: pages.OurTeamPage })),
)

const SaudiVision2030Page = lazy(() =>
  import('./pages/about/routePages').then((pages) => ({ default: pages.SaudiVision2030Page })),
)

const ResidentialProjectsPage = lazy(() =>
  import('./components/projects/routePages').then((pages) => ({ default: pages.ResidentialProjectsPage })),
)

const ProjectDetailsPage = lazy(() =>
  import('./components/projects/routePages').then((pages) => ({ default: pages.ProjectDetailsPage })),
)

const CommercialProjectsPage = lazy(() =>
  import('./components/projects/routePages').then((pages) => ({ default: pages.CommercialProjectsPage })),
)

const EnvironmentalResponsibilityPage = lazy(() =>
  import('./pages/sustainability/routePages').then((pages) => ({ default: pages.EnvironmentalResponsibilityPage })),
)

const SocialResponsibilityPage = lazy(() =>
  import('./pages/sustainability/routePages').then((pages) => ({ default: pages.SocialResponsibilityPage })),
)

const EconomicResponsibilityPage = lazy(() =>
  import('./pages/sustainability/routePages').then((pages) => ({ default: pages.EconomicResponsibilityPage })),
)

const ContinuousImprovementPage = lazy(() =>
  import('./pages/sustainability/routePages').then((pages) => ({ default: pages.ContinuousImprovementPage })),
)

const RiskAssessmentPage = lazy(() =>
  import('./pages/businessContinuity/routePages').then((pages) => ({ default: pages.RiskAssessmentPage })),
)

const BusinessImpactAnalysisPage = lazy(() =>
  import('./pages/businessContinuity/routePages').then((pages) => ({ default: pages.BusinessImpactAnalysisPage })),
)

const PlanDevelopmentPage = lazy(() =>
  import('./pages/businessContinuity/routePages').then((pages) => ({ default: pages.PlanDevelopmentPage })),
)

const RecoveryRestorationPage = lazy(() =>
  import('./pages/businessContinuity/routePages').then((pages) => ({ default: pages.RecoveryRestorationPage })),
)

const LeadershipAccountabilityPage = lazy(() =>
  import('./pages/businessContinuity/routePages').then((pages) => ({ default: pages.LeadershipAccountabilityPage })),
)

const CareersPage = lazy(() =>
  import('./pages/careers/routePages').then((pages) => ({ default: pages.CareersPage })),
)

const TrainingPage = lazy(() =>
  import('./pages/careers/routePages').then((pages) => ({ default: pages.TrainingPage })),
)

const SupplierRegistrationPage = lazy(() => import('./pages/suppliers/SupplierRegistrationPage'))

const ContactPage = lazy(() => import('./pages/contact/ContactPage'))

function ContractingSiteRoutes() {
  return (
    <LanguageProvider>
    <ContractingThemeProvider>
    <Routes>
      <Route element={<ContractingLayout />}>
        <Route
          index
          element={<HomePage />}
        />

        {/* About */}
        <Route
          path="about"
          element={
            <Navigate to={contractingPath('about/who-we-are')} replace />
          }
        />

        <Route
          path="about/who-we-are"
          element={<WhoWeArePage />}
        />

        <Route
          path="about/chairman-speech"
          element={<ChairmanSpeechPage />}
        />

        <Route
          path="about/ceo-message"
          element={<CeoSpeechPage />}
        />

        <Route
          path="about/why-fbs-contracting"
          element={<WhyFbsPage />}
        />

        <Route
          path="about/our-team"
          element={<OurTeamPage />}
        />

        <Route
          path="about/vision-mission"
          element={<VisionMissionPage />}
        />

        <Route
          path="about/saudi-vision-2030"
          element={<SaudiVision2030Page />}
        />

        <Route
          path="about/core-values"
          element={<CoreValuesPage />}
        />

        {/* Projects */}
        <Route
          path="projects"
          element={
            <Navigate to={contractingPath('projects/residential')} replace />
          }
        />

        <Route
          path="projects/residential"
          element={<ResidentialProjectsPage />}
        />

        <Route
          path="projects/commercial"
          element={<CommercialProjectsPage />}
        />

        <Route
          path="projects/:slug"
          element={<ProjectDetailsPage />}
        />

        {/* Sustainability */}
        <Route
          path="sustainability"
          element={
            <Navigate
              to={contractingPath('sustainability/environmental-responsibility')}
              replace
            />
          }
        />

        <Route
          path="sustainability/environmental-responsibility"
          element={<EnvironmentalResponsibilityPage />}
        />

        <Route
          path="sustainability/social-responsibility"
          element={<SocialResponsibilityPage />}
        />

        <Route
          path="sustainability/economic-responsibility"
          element={<EconomicResponsibilityPage />}
        />

        <Route
          path="sustainability/continuous-improvement"
          element={<ContinuousImprovementPage />}
        />

        {/* Business Continuity */}
        <Route
          path="business-continuity"
          element={
            <Navigate
              to={contractingPath('business-continuity/risk-assessment-management')}
              replace
            />
          }
        />

        <Route
          path="business-continuity/risk-assessment-management"
          element={<RiskAssessmentPage />}
        />

        <Route
          path="business-continuity/business-impact-analysis"
          element={<BusinessImpactAnalysisPage />}
        />

        <Route
          path="business-continuity/plan-development"
          element={<PlanDevelopmentPage />}
        />

        <Route
          path="business-continuity/recovery-restoration"
          element={<RecoveryRestorationPage />}
        />

        <Route
          path="business-continuity/leadership-accountability"
          element={<LeadershipAccountabilityPage />}
        />

        {/* Careers */}
        <Route
          path="careers"
          element={<CareersPage />}
        />

        <Route
          path="training"
          element={<TrainingPage />}
        />

        {/* Suppliers */}
        <Route
          path="suppliers"
          element={<SupplierRegistrationPage />}
        />

        {/* Contact */}
        <Route
          path="contact"
          element={<ContactPage />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
    </ContractingThemeProvider>
    </LanguageProvider>
  )
}

export default ContractingSiteRoutes