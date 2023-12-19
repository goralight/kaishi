import React from 'react'

import { ThemeProvider, Global, css, useTheme } from '@emotion/react'
import { standardTheme } from './theme'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

library.add(fab, fas, far)

const GlobalStyles = (): JSX.Element => {
  const theme = useTheme()
  return (
    <Global styles={css`
      body {
        color: ${theme.palette.colors.grey.white};
        background-color: ${theme.palette.colors.grey.black};
      }
    `} />
  )
}

const App = (): JSX.Element => {
  return (
    <ThemeProvider theme={standardTheme}>
      <GlobalStyles />
      <div className="App">
        <header className="App-header"></header>
        {/* button for settings */}
      </div>
    </ThemeProvider>
  )
}

export default App
