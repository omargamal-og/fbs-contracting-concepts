import { Route, Routes } from 'react-router-dom'
import ContractingRoutes from './contracting/routes/ContractingRoutes'

function App() {
  return (
    <Routes>
      <Route
        path="/contracting/*"
        element={<ContractingRoutes />}
      />
    </Routes>
  )
}

export default App