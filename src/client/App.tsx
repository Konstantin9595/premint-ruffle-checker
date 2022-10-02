import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useForm } from "react-hook-form"
import AddressList from './components/AddressList'

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

// const store = {
//   walletAddresses: [
//     // '0xA9D3525E05AE534120a33881F6aa2fD01fCA2F4E',
//     // '0xA4D2526E05AE534120a33881F6aa2fD01fcG2F2Q',
//     // '0xA9D3527E05AE534120a33881F6aa2fD01fCA3F4B',
//     // '0xA9D3525E05AE534120a33881F6aa2fD01fCA2F4E',
//     // '0xA4D2526E05AE534120a33881F6aa2fD01fcG2F2Q',
//     // '0xA9D3527E05AE534120a33881F6aa2fD01fCA3F4B',
//     // '0xA9D3525E05AE534120a33881F6aa2fD01fCA2F4E',
//     // '0xA4D2526E05AE534120a33881F6aa2fD01fcG2F2Q',
//     // '0xA9D3527E05AE534120a33881F6aa2fD01fCA3F4B',
//     // '0xA9D3525E05AE534120a33881F6aa2fD01fCA2F4E',
//     // '0xA4D2526E05AE534120a33881F6aa2fD01fcG2F2Q',
//     // '0xA9D3527E05AE534120a33881F6aa2fD01fCA3F4B',
//     // '0xA9D3525E05AE534120a33881F6aa2fD01fCA2F4E',
//     // '0xA4D2526E05AE534120a33881F6aa2fD01fcG2F2Q',
//     // '0xA9D3527E05AE534120a33881F6aa2fD01fCA3F4B',
//     // '0xA9D3525E05AE534120a33881F6aa2fD01fCA2F4E',
//     // '0xA4D2526E05AE534120a33881F6aa2fD01fcG2F2Q',
//     // '0xA9D3527E05AE534120a33881F6aa2fD01fCA3F4B',
//     // '0xA9D3525E05AE534120a33881F6aa2fD01fCA2F4E',
//     // '0xA4D2526E05AE534120a33881F6aa2fD01fcG2F2Q',
//     // '0xA9D3527E05AE534120a33881F6aa2fD01fCA3F4B',
//     // '0xA9D3525E05AE534120a33881F6aa2fD01fCA2F4E',
//     // '0xA4D2526E05AE534120a33881F6aa2fD01fcG2F2Q',
//     // '0xA2D3527E05AE534120a33111F6aa2fD03EZF26AW'
//   ]
// }

function App() {
  return (
    <AppContainer className="App">
      <Header className="app-header">
        <Title>
          Premint ruffle checker
        </Title>
      </Header>
      <AppContent className='app-content'>
        <AddressList />
      </AppContent>
    </AppContainer>
  );
}

export default App;

// https://mui.com/material-ui/react-divider/ - list of items
// https://mui.com/material-ui/icons/#font-material-icons - add item on list
// https://mui.com/material-ui/react-tooltip/#basic-tooltip - tooltips