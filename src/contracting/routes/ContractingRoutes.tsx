import { Route, Routes } from 'react-router-dom'

import ConceptsHome from '../pages/ConceptsHome'
import ConceptA from '../concepts/concept-a/ConceptA'
import ConceptB from '../concepts/concept-b/ConceptB'
import ConceptC from '../concepts/concept-c/ConceptC'
import ConceptAProjectDetails
  from '../concepts/concept-a/pages/ConceptAProjectDetails'
import ConceptBProjectDetails from '../concepts/concept-b/pages/ConceptBProjectDetails'

function ContractingRoutes() {
  return (
    <Routes>
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
    </Routes>
  )
}

export default ContractingRoutes