import '@emotion/react'

import * as Themes from './theme'

declare module '@emotion/react' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends Themes.StandardTheme {}
}
