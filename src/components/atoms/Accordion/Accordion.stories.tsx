import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import Accordion from '.'

const meta = {
  title: 'Atoms/Accordion',
  component: Accordion,
  parameters: {
    layout: 'centered'
  },
  args: {
    label: 'Accordion',
    children: (
      <div>
        <p>content, some more content, nice content</p>
      </div>
    )
  },
  tags: ['autodocs']
} satisfies Meta<typeof Accordion>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
Primary.storyName = 'Accordion'
