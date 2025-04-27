import IdentificationStatus from './components/IdentificationStatus'
import { IdentificationStatusProvider } from './contexts/IdentificationStatus'
import ScrollIdentifier from './components/ScrollIdentifier'
import StaffCounter from './components/StaffCounter'
import { Container } from 'react-bootstrap'

function App() {
  return (
    <Container className='mt-3'>
      <IdentificationStatusProvider>
        <IdentificationStatus />
        <hr />
        <StaffCounter />
        <hr />
        <ScrollIdentifier />
      </IdentificationStatusProvider>
    </Container>
  )
}

export default App
