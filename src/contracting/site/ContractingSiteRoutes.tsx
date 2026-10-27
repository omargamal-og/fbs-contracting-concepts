import { lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import ContractingLayout from './layouts/ContractingLayout'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'

import LanguageProvider from './i18n/LanguageProvider'
import { useLanguage } from './i18n/useLanguage'
import ContractingThemeProvider from './theme/ContractingThemeProvider'
import { V3_BASE } from './v3/content'


const SaudiVision2030Page = lazy(() =>
  import('./pages/about/routePages').then((pages) => ({ default: pages.SaudiVision2030Page })),
)

const ProjectDetailsPage = lazy(() =>
  import('./components/projects/routePages').then((pages) => ({ default: pages.ProjectDetailsPage })),
)

const CareersPage = lazy(() =>
  import('./pages/careers/routePages').then((pages) => ({ default: pages.CareersPage })),
)

const TrainingPage = lazy(() =>
  import('./pages/careers/routePages').then((pages) => ({ default: pages.TrainingPage })),
)

const SupplierRegistrationPage = lazy(() => import('./pages/suppliers/SupplierRegistrationPage'))

const ContactPage = lazy(() => import('./pages/contact/ContactPage'))

function V3LegacyRedirect({ page, anchor }: { page: string; anchor?: string }) {
  const { language } = useLanguage()
  return <Navigate to={`${V3_BASE}/${page}?lang=${language}${anchor ? `#${anchor}` : ''}`} replace />
}

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
          element={<V3LegacyRedirect page="company" anchor="about" />}
        />

        <Route
          path="about/who-we-are"
          element={<V3LegacyRedirect page="company" anchor="about" />}
        />

        <Route
          path="about/chairman-speech"
          element={<V3LegacyRedirect page="company" anchor="chairman-message" />}
        />

        <Route
          path="about/ceo-message"
          element={<V3LegacyRedirect page="company" anchor="ceo-message" />}
        />

        <Route
          path="about/why-fbs-contracting"
          element={<V3LegacyRedirect page="company" anchor="why-fbs" />}
        />

        <Route
          path="about/our-team"
          element={<V3LegacyRedirect page="company" anchor="leadership" />}
        />

        <Route
          path="about/vision-mission"
          element={<V3LegacyRedirect page="company" anchor="vision-mission" />}
        />

        <Route
          path="about/saudi-vision-2030"
          element={<SaudiVision2030Page />}
        />

        <Route
          path="about/core-values"
          element={<V3LegacyRedirect page="company" anchor="values" />}
        />

        {/* Projects */}
        <Route
          path="projects"
          element={
            <V3LegacyRedirect page="projects" anchor="directory" />
          }
        />

        <Route
          path="projects/residential"
          element={<V3LegacyRedirect page="projects" anchor="residential" />}
        />

        <Route
          path="projects/commercial"
          element={<V3LegacyRedirect page="projects" anchor="commercial" />}
        />

        <Route
          path="projects/:slug"
          element={<ProjectDetailsPage />}
        />

        {/* Sustainability */}
        <Route
          path="sustainability"
          element={
            <V3LegacyRedirect page="approach" anchor="sustainability" />
          }
        />

        <Route
          path="sustainability/environmental-responsibility"
          element={<V3LegacyRedirect page="approach" anchor="environmental-responsibility" />}
        />

        <Route
          path="sustainability/social-responsibility"
          element={<V3LegacyRedirect page="approach" anchor="social-responsibility" />}
        />

        <Route
          path="sustainability/economic-responsibility"
          element={<V3LegacyRedirect page="approach" anchor="economic-responsibility" />}
        />

        <Route
          path="sustainability/continuous-improvement"
          element={<V3LegacyRedirect page="approach" anchor="continuous-improvement" />}
        />

        {/* Business Continuity */}
        <Route
          path="business-continuity"
          element={
            <V3LegacyRedirect page="approach" anchor="continuity" />
          }
        />

        <Route
          path="business-continuity/risk-assessment-management"
          element={<V3LegacyRedirect page="approach" anchor="risk-assessment-management" />}
        />

        <Route
          path="business-continuity/business-impact-analysis"
          element={<V3LegacyRedirect page="approach" anchor="business-impact-analysis" />}
        />

        <Route
          path="business-continuity/plan-development"
          element={<V3LegacyRedirect page="approach" anchor="plan-development" />}
        />

        <Route
          path="business-continuity/recovery-restoration"
          element={<V3LegacyRedirect page="approach" anchor="recovery-restoration" />}
        />

        <Route
          path="business-continuity/leadership-accountability"
          element={<V3LegacyRedirect page="approach" anchor="leadership-accountability" />}
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
