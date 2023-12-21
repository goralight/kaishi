import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import Icon from '.'

const meta = {
  title: 'Atoms/Icon',
  component: Icon,
  parameters: {
    layout: 'centered'
  },
  args: {
    icon: 'otter',
    color: 'primary',
    size: 'sm'
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Icon>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
Primary.storyName = 'Icon'
