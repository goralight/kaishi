import React, { useState } from 'react'

import { ThemeProvider, Global, css, useTheme } from '@emotion/react'
import { standardTheme } from '../theme'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { Provider } from 'react-redux'
import { store } from '../store/store'
import SlideIn from '../components/atoms/SlideIn'
import Icon from '../components/atoms/Icon'
import styled from '@emotion/styled'

library.add(fab, fas, far)

const GlobalStyles = (): JSX.Element => {
  const theme = useTheme()
  return (
    <Global styles={
      css`
        @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap");

        body {
          background-color: ${theme.palette.colors.grey.black};
          overflow-x: hidden;

          & > * {
            font-family: 'Inter', sans-serif;
            color: ${theme.palette.mode === 'dark' ? theme.palette.colors.grey.white : theme.palette.colors.grey.black};
          }
        }
      `
    } />
  )
}

const IconContainer = styled.div(
  ({ theme }): string => {
    return `
    position: absolute;
    top: 16px;
    left: 16px;
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
      <ThemeProvider theme={standardTheme}>
        <GlobalStyles />
        <div className="App">
          <header className="App-header"></header>
          <SlideIn isVisible={isVisible} setIsVisible={setIsVisible}>
            <h1>Settings</h1>
          </SlideIn>
          <IconContainer>
            <Icon
              color="secondary"
              icon="gear"
              onClick={(): void => {setIsVisible(true)}}
              prefix="fas"
              size="xl"
            />
          </IconContainer>
        </div>
      </ThemeProvider>
    </Provider>
  )
}

export default App
