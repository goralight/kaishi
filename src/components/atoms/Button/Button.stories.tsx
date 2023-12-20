import type { Meta, StoryObj } from '@storybook/react'

import Button from '.'

const meta = {
  title: 'Atoms/Button',
  component: Button,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  args: {
    color: 'success',
    colorVariant: 'main',
    size: 'md',
    children: 'Button Text'
  }
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
