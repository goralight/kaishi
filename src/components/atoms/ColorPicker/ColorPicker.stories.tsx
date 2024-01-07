import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import ColorPicker from '.'

const meta = {
  title: 'Atoms/ColorPicker',
  component: ColorPicker,
  parameters: {
    layout: 'centered'
  },
  args: {
    color: 'red'
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ColorPicker>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
Primary.storyName = 'ColorPicker'
