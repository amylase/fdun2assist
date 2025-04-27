import IdentificationStatus from './components/IdentificationStatus'
import { IdentificationStatusProvider } from './contexts/IdentificationStatus'
import ScrollIdentifier from './components/ScrollIdentifier'
import StaffCounter from './components/StaffCounter'

function App() {
  return (
    <>
      <IdentificationStatusProvider>
        <IdentificationStatus />
        <StaffCounter />
        <ScrollIdentifier />
      </IdentificationStatusProvider>
    </>
  )
}

export default App
