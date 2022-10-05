import styled from 'styled-components'
import PremintCheckerContainer from './components/PremintCheckerContainer'

const AppContainer = styled.div`
  max-width: 960px;
  margin: 0 auto;
`
const Header = styled.header`
  margin: 0 auto;
`

const Title = styled.h1`
  font-size: 22px;
  text-transform: uppercase;
  text-align: center;
`
const AppContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  text-align: center;
`



function App() {
  return (
    <AppContainer className="App">
      <Header className="app-header">
        <Title>
          Premint ruffle checker
        </Title>
      </Header>
      <AppContent className='app-content'>
        <PremintCheckerContainer />
      </AppContent>
    </AppContainer>
  );
}

export default App