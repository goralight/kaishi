import React from 'react'

import { ThemeProvider, Global, css, useTheme } from '@emotion/react'
import { standardTheme } from '../theme'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import AddPerson from './AddPerson'
import { Provider } from 'react-redux'
import { store } from '../store/store'
import ListPerson from './ListPerson'

library.add(fab, fas, far)

const GlobalStyles = (): JSX.Element => {
  const theme = useTheme()
  return (
    <Global styles={
      css`
        @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap");

        body {
          background-color: ${theme.palette.colors.grey.black};

          & > {
            font-family: 'Inter', sans-serif;
            color: ${theme.palette.mode === 'dark' ? theme.palette.colors.grey.white : theme.palette.colors.grey.black};
          }
        }
      `
    } />
  )
}

const App = (): JSX.Element => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={standardTheme}>
        <GlobalStyles />
        <div className="App">
          <header className="App-header"></header>
          <AddPerson />
          <ListPerson />
        </div>
      </ThemeProvider>
    </Provider>
  )
}

export default App
