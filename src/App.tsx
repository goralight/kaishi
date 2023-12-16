import React from 'react';
import logo from './logo.svg';
import './App.css';


import styled from '@emotion/styled'
import { ThemeProvider } from '@emotion/react';
import { standardTheme } from './theme';

const StyledPara = styled.p(
  ({ theme }): string => {
    return `
      color: ${theme.palette.colors.red.main};
      background-color: ${theme.palette.colors.green.main};
    `
  }
)

function App() {
  return (
    <ThemeProvider theme={standardTheme}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <StyledPara>
            Edit <code>src/App.tsx</code> and save to reload.
          </StyledPara>
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
  );
}

export default App;
