import { Navigate, Route, Routes } from 'react-router-dom'

import { contractingPath } from './config/site'
import ContractingLayout from './layouts/ContractingLayout'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'

import LanguageProvider from './i18n/LanguageProvider'
import ContractingThemeProvider from './theme/ContractingThemeProvider'
import WhoWeArePage from './pages/about/WhoWeArePage'
import ChairmanSpeechPage from './pages/about/ChairmanSpeechPage'
import CeoSpeechPage from './pages/about/CeoSpeechPage'
import WhyFbsPage from './pages/about/WhyFbsPage'
import VisionMissionPage from './pages/about/VisionMissionPage'
import CoreValuesPage from './pages/about/CoreValuesPage'
import OurTeamPage from './pages/about/OurTeamPage'
import SaudiVision2030Page from './pages/about/SaudiVision2030Page'
import ResidentialProjectsPage from './components/projects/ResidentialProjectsPage'
import ProjectDetailsPage from './components/projects/ProjectDetailsPage'
import CommercialProjectsPage from './components/projects/CommercialProjectsPage'
import EnvironmentalResponsibilityPage from './pages/sustainability/EnvironmentalResponsibilityPage'
import SocialResponsibilityPage from './pages/sustainability/SocialResponsibilityPage'
import EconomicResponsibilityPage from './pages/sustainability/EconomicResponsibilityPage'
import ContinuousImprovementPage from './pages/sustainability/ContinuousImprovementPage'
import RiskAssessmentPage from './pages/businessContinuity/RiskAssessmentPage'
import BusinessImpactAnalysisPage from './pages/businessContinuity/BusinessImpactAnalysisPage'
import PlanDevelopmentPage from './pages/businessContinuity/PlanDevelopmentPage'
import RecoveryRestorationPage from './pages/businessContinuity/RecoveryRestorationPage'
import LeadershipAccountabilityPage from './pages/businessContinuity/LeadershipAccountabilityPage'
import CareersPage from './pages/careers/CareersPage'
import TrainingPage from './pages/careers/TrainingPage'
import SupplierRegistrationPage from './pages/suppliers/SupplierRegistrationPage'
import ContactPage from './pages/contact/ContactPage'


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