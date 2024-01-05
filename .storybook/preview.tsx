import React from 'react';
import { withThemeFromJSXProvider } from '@storybook/addon-themes';

import { type Preview } from "@storybook/react";
import { themes } from '@storybook/theming';

import { ThemeProvider, Global, css, useTheme } from "@emotion/react";
import { StandardTheme, standardTheme } from "../src/theme";

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { Provider } from 'react-redux';
import { store } from '../src/store/store';

library.add(fab, fas, far)

const preview: Preview = {
  parameters: {
    docs: {
      theme: themes.dark
    },
    backgrounds: {
      default: 'Dark',
      values: [
        { name: 'Dark', value: '#222222' },
        { name: 'Light', value: '#f5f5f5' },
      ],
    },
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

const GlobalStyles = () => {
  const theme = useTheme() as StandardTheme
  return (
    <Global styles={
      css`
        @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap");

        body {
          overflow-x: hidden;
        }
        
        body > * {
          color: ${theme.palette.mode === 'dark' ? theme.palette.colors.grey.white : theme.palette.colors.grey.black};
          font-family: 'Inter', sans-serif;
        }
      `
    } />
  )
}

export const decorators = [
  (Story) => (
    <>
      {GlobalStyles}
      <Provider store={store}>
        <Story />
      </Provider>
    </>
  ),
  withThemeFromJSXProvider({
    themes: {
      standardTheme
    },
    defaultTheme: 'standardTheme',
    Provider: ThemeProvider,
    GlobalStyles
  }),
]

export default preview;
