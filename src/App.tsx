import React from 'react'
import logo from './logo.svg'
import './App.css'

import styled from '@emotion/styled'

import { ThemeProvider } from '@emotion/react'
import { standardTheme } from './theme'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

library.add(fab, fas, far)

const StyledPara = styled.p(
  ({ theme }): string => {
    return `
      color: ${theme.palette.colors.red.main};
      background-color: ${theme.palette.colors.green.main};
      padding: ${theme.spacing.xl}px ${theme.spacing.sm}px;
      border-radius: ${theme.border.radius.lg}px;
      border: ${theme.border.width.md}px ${theme.palette.colors.red.main} solid;
    `
  }
)

const JohnnaChanPara = styled.p(
  ({ theme }): string => {
    return `
      color: ${theme.palette.colors.pink.main};
      background-color: ${theme.palette.colors.grey.main};
      padding: ${theme.spacing.lg}px;
      border-radius: ${theme.border.radius.md}px;
  `
  }
)

function App(): JSX.Element {
  return (
    <ThemeProvider theme={standardTheme}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <StyledPara>
            Edit <code>src/App.tsx</code> and save to reload.
            <FontAwesomeIcon color='#ff00ff' icon='magnifying-glass' />
          </StyledPara>
          <JohnnaChanPara>John is stinky pooey</JohnnaChanPara>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    </ThemeProvider>
  )
}

export default App
