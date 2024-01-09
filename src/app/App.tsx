import React, { useState } from 'react'

import { Global, css, useTheme } from '@emotion/react'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { Provider } from 'react-redux'
import { store } from '../store/store'
import Icon from '../components/atoms/Icon'
import styled from '@emotion/styled'
import Settings from './views/Settings'
import ThemeContext from './ThemeContext'

library.add(fab, fas, far)

const GlobalStyles = (): JSX.Element => {
  const theme = useTheme()
  return (
    <Global styles={
      css`
        @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap");

        body {
          background-color: ${theme.palette.colors.background.main};
          overflow-x: hidden;

          & > * {
            font-family: 'Inter', sans-serif;
            color: ${theme.palette.colors.foreground.main};
          }
        }
      `
    } />
  )
}

const IconContainer = styled.div(
  (): string => {
    return `
      position: absolute;
      top: 16px;
      right: 16px;
      opacity: .2;
      transition: .3s ease;

      &:hover {
        opacity: 1;
      }
    `
  }
)

const App = (): JSX.Element => {
  const [isVisible, setIsVisible] = useState(false)
  return (
    <Provider store={store}>
      <ThemeContext>
        <GlobalStyles />
        <div className="App">
          <header className="App-header"></header>
          <IconContainer>
            <Icon
              color="secondary"
              icon="gear"
              onClick={(): void => { setIsVisible(true) }}
              prefix="fas"
              size="xxl"
            />
          </IconContainer>
          <Settings isVisible={isVisible} setIsVisible={setIsVisible} />
        </div>
      </ThemeContext>
    </Provider>
  )
}

export default App
