import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { standardTheme } from '../../../theme'
import AddFile from '.'

const meta = {
  title: 'Atoms/AddFile',
  component: AddFile,
  parameters: {
    layout: 'centered'
  },
  args: {
    children: 'Add File',
    id: 'AddFile',
    size: 'md',
    color: 'primary',
    colorVariant: 'main',
    disabled: false,
    accept: '*'

  },
  tags: ['autodocs']
} satisfies Meta<typeof AddFile>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
Primary.storyName = 'AddFile'
