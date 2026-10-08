import { Route, Routes } from 'react-router-dom'

import PagePlaceholder from './components/system/PagePlaceholder'
import ContractingLayout from './layouts/ContractingLayout'
import HomePage from './pages/HomePage'

import LanguageProvider from './i18n/LanguageProvider'
import ContractingThemeProvider from './theme/ContractingThemeProvider'


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
            <PagePlaceholder title="About FBS Contracting" />
          }
        />

        <Route
          path="about/who-we-are"
          element={
            <PagePlaceholder
              eyebrow="About Us"
              title="Who We Are"
            />
          }
        />

        <Route
          path="about/ceo-message"
          element={
            <PagePlaceholder
              eyebrow="About Us"
              title="CEO Message"
            />
          }
        />

        <Route
          path="about/our-team"
          element={
            <PagePlaceholder
              eyebrow="About Us"
              title="Our Team"
            />
          }
        />

        <Route
          path="about/why-fbs-contracting"
          element={
            <PagePlaceholder
              eyebrow="About Us"
              title="Why FBS Contracting?"
            />
          }
        />

        <Route
          path="about/vision-mission"
          element={
            <PagePlaceholder
              eyebrow="About Us"
              title="Vision & Mission"
            />
          }
        />

        <Route
          path="about/saudi-vision-2030"
          element={
            <PagePlaceholder
              eyebrow="About Us"
              title="Saudi Vision 2030"
            />
          }
        />

        <Route
          path="about/core-values"
          element={
            <PagePlaceholder
              eyebrow="About Us"
              title="Core Values"
            />
          }
        />

        {/* Projects */}
        <Route
          path="projects"
          element={
            <PagePlaceholder title="Our Projects" />
          }
        />

        <Route
          path="projects/residential"
          element={
            <PagePlaceholder
              eyebrow="Our Projects"
              title="Residential Projects"
            />
          }
        />

        <Route
          path="projects/commercial"
          element={
            <PagePlaceholder
              eyebrow="Our Projects"
              title="Commercial Projects"
            />
          }
        />

        <Route
          path="projects/:slug"
          element={
            <PagePlaceholder
              eyebrow="Our Projects"
              title="Project Details"
            />
          }
        />

        {/* Sustainability */}
        <Route
          path="sustainability"
          element={
            <PagePlaceholder title="Sustainability" />
          }
        />

        <Route
          path="sustainability/environmental-responsibility"
          element={
            <PagePlaceholder
              eyebrow="Sustainability"
              title="Environmental Responsibility"
            />
          }
        />

        <Route
          path="sustainability/social-responsibility"
          element={
            <PagePlaceholder
              eyebrow="Sustainability"
              title="Social Responsibility"
            />
          }
        />

        <Route
          path="sustainability/economic-responsibility"
          element={
            <PagePlaceholder
              eyebrow="Sustainability"
              title="Economic Responsibility"
            />
          }
        />

        <Route
          path="sustainability/continuous-improvement"
          element={
            <PagePlaceholder
              eyebrow="Sustainability"
              title="Continuous Improvement"
            />
          }
        />

        {/* Business Continuity */}
        <Route
          path="business-continuity"
          element={
            <PagePlaceholder title="Business Continuity" />
          }
        />

        <Route
          path="business-continuity/risk-assessment-management"
          element={
            <PagePlaceholder
              eyebrow="Business Continuity"
              title="Risk Assessment and Management"
            />
          }
        />

        <Route
          path="business-continuity/business-impact-analysis"
          element={
            <PagePlaceholder
              eyebrow="Business Continuity"
              title="Business Impact Analysis"
            />
          }
        />

        <Route
          path="business-continuity/plan-development"
          element={
            <PagePlaceholder
              eyebrow="Business Continuity"
              title="Plan Development"
            />
          }
        />

        <Route
          path="business-continuity/recovery-restoration"
          element={
            <PagePlaceholder
              eyebrow="Business Continuity"
              title="Recovery and Restoration"
            />
          }
        />

        <Route
          path="business-continuity/leadership-accountability"
          element={
            <PagePlaceholder
              eyebrow="Business Continuity"
              title="Leadership and Accountability"
            />
          }
        />

        {/* Careers */}
        <Route
          path="careers"
          element={
            <PagePlaceholder title="Careers" />
          }
        />

        <Route
          path="training"
          element={
            <PagePlaceholder title="Training" />
          }
        />

        {/* Suppliers */}
        <Route
          path="suppliers"
          element={
            <PagePlaceholder title="Supplier Registration" />
          }
        />

        {/* Contact */}
        <Route
          path="contact"
          element={
            <PagePlaceholder title="Contact Us" />
          }
        />
      </Route>
    </Routes>
    </ContractingThemeProvider>
    </LanguageProvider>
  )
}

export default ContractingSiteRoutes