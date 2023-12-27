import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import StatusMessage from '.'

const meta = {
  title: 'Atoms/StatusMessage',
  component: StatusMessage,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  args: {
    type: 'success',
    children: 'Status Message'
  }
} satisfies Meta<typeof StatusMessage>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
Primary.storyName = 'StatusMessage'
