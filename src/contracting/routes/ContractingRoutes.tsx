import { Route, Routes } from 'react-router-dom'

import ConceptsHome from '../pages/ConceptsHome'
import ConceptA from '../concepts/concept-a/ConceptA'
import ConceptB from '../concepts/concept-b/ConceptB'
import ConceptC from '../concepts/concept-c/ConceptC'
import ConceptAProjectDetails
  from '../concepts/concept-a/pages/ConceptAProjectDetails'

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
        path="concept-b"
        element={<ConceptB />}
      />

      <Route
        path="concept-c"
        element={<ConceptC />}
      />

      <Route
        path="concept-a/projects/:slug"
        element={<ConceptAProjectDetails />}
      />
    </Routes>
  )
}

export default ContractingRoutes