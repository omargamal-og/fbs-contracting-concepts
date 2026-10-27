import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

import ConceptsHome from '../pages/ConceptsHome'
import ConceptA from '../concepts/concept-a/ConceptA'
import ConceptB from '../concepts/concept-b/ConceptB'
import ConceptC from '../concepts/concept-c/ConceptC'
import ConceptAProjectDetails
  from '../concepts/concept-a/pages/ConceptAProjectDetails'
import ConceptBProjectDetails from '../concepts/concept-b/pages/ConceptBProjectDetails'
import ConceptCProjectDetails from '../concepts/concept-c/pages/ConceptCProjectDetails'
import ContractingSiteRoutes from '../site/ContractingSiteRoutes'

const V2Routes = lazy(() => import('../site/v2/V2Routes'))
const V3Preview = lazy(() => import('../site/v3/V3Preview'))
const V3ProjectDetails = lazy(() => import('../site/v3/ProjectDetails'))
const V3ConsolidatedPage = lazy(() => import('../site/v3/ConsolidatedPage'))

function ContractingRoutes() {
  return (
    <Routes>
      <Route path="v3/projects/:slug" element={<Suspense fallback={<div role="status" style={{minHeight:'100vh',background:'#EEF4F6',color:'#082F4D',padding:40}}>FBS Contracting</div>}><V3ProjectDetails/></Suspense>} />
      <Route path="v3/company" element={<Suspense fallback={<div role="status" style={{minHeight:'100vh',background:'#EEF4F6',color:'#082F4D',padding:40}}>FBS Contracting</div>}><V3ConsolidatedPage page="company"/></Suspense>} />
      <Route path="v3/what-we-do" element={<Suspense fallback={<div role="status" style={{minHeight:'100vh',background:'#EEF4F6',color:'#082F4D',padding:40}}>FBS Contracting</div>}><V3ConsolidatedPage page="what-we-do"/></Suspense>} />
      <Route path="v3/approach" element={<Suspense fallback={<div role="status" style={{minHeight:'100vh',background:'#EEF4F6',color:'#082F4D',padding:40}}>FBS Contracting</div>}><V3ConsolidatedPage page="approach"/></Suspense>} />
      <Route path="v3/projects" element={<Suspense fallback={<div role="status" style={{minHeight:'100vh',background:'#EEF4F6',color:'#082F4D',padding:40}}>FBS Contracting</div>}><V3ConsolidatedPage page="projects"/></Suspense>} />
      <Route path="v3/news" element={<Suspense fallback={<div role="status" style={{minHeight:'100vh',background:'#EEF4F6',color:'#082F4D',padding:40}}>FBS Contracting</div>}><V3ConsolidatedPage page="news"/></Suspense>} />
      <Route path="v3/governance" element={<Suspense fallback={<div role="status" style={{minHeight:'100vh',background:'#EEF4F6',color:'#082F4D',padding:40}}>FBS Contracting</div>}><V3ConsolidatedPage page="governance"/></Suspense>} />
      <Route path="v3" element={<Suspense fallback={<div role="status" style={{minHeight:'100vh',background:'#EEF4F6',color:'#082F4D',padding:40}}>FBS Contracting</div>}><V3Preview/></Suspense>} />
      <Route path="v2/*" element={<Suspense fallback={<div role="status" style={{minHeight:'100vh',background:'#082F4D',color:'white',padding:40}}>FBS Contracting</div>}><V2Routes/></Suspense>} />
      <Route
        index
        element={<ConceptsHome />}
      />

      <Route
        path="concept-a"
        element={<ConceptA />}
      />

      <Route
        path="concept-a/projects/:slug"
        element={<ConceptAProjectDetails />}
      />

      <Route
        path="concept-b"
        element={<ConceptB />}
      />

      <Route
        path="concept-b/projects/:slug"
        element={<ConceptBProjectDetails />}
      />

      <Route
        path="concept-c"
        element={<ConceptC />}
      />

    <Route
      path="concept-c/projects/:slug"
      element={<ConceptCProjectDetails />}
    />

    <Route
      path="build/*"
      element={<ContractingSiteRoutes />}
    />

    </Routes>
  )
}

export default ContractingRoutes
