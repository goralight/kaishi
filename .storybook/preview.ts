import React from "react"
import { withThemeFromJSXProvider } from '@storybook/addon-themes'
import { themes } from '@storybook/theming'
import type { Preview } from "@storybook/react"

import { ThemeProvider, Global } from "@emotion/react"
import { standardTheme } from "../src/theme"


const preview: Preview = {
  parameters: {
    docs: {
      theme: themes.dark
    },
    backgrounds: {
      default: 'Dark',
      values: [
        { name: 'Dark', value: '#161616' },
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

export const decorators = [
  // (Story) => (
  //   <>
  //     {GlobalStyles}
  //     <Story />
  //   </>
  // ),
  withThemeFromJSXProvider({
    themes: {
      standardTheme
    },
    defaultTheme: 'standardTheme',
    Provider: ThemeProvider,
  }),
]

export default preview;
