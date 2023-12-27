import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { Colors, standardTheme } from '../../../theme'
import Pill from '.'

const meta = {
  title: 'Atoms/Pill',
  component: Pill,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  args: {
    color: 'primary',
    colorVariant: 'main',
    size: 'xs',
    children: 'Pill Text'
  }
} satisfies Meta<typeof Pill>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
Primary.storyName = 'Pill'
