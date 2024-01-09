import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import ThemePaletteSelection from '.'

const meta = {
  title: 'Molecules/ThemePaletteSelection',
  component: ThemePaletteSelection,
  parameters: {
    layout: 'centered'
  },
  args: {
    themeId: 'default'
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ThemePaletteSelection>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
Primary.storyName = 'ThemePaletteSelection'
