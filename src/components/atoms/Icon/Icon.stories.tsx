import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import Icon from '.'
import { Colors, standardTheme } from '../../../theme'

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
  tags: ['autodocs']
} satisfies Meta<typeof Icon>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
Primary.storyName = 'Icon'
const colors: (keyof Colors | 'white' | 'black')[] = [
  'white',
  'black',
  ...Object.keys(standardTheme.palette.colors) as (keyof typeof standardTheme.palette.colors)[]
]

const colorIcons = colors.map((color) => (
  <div key={color} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <h3>{color}</h3>
    <Icon icon='otter' color={color} size='xxl' />
  </div>
))

export const allColors: Story = {
  render: (): JSX.Element => (
    <div style={{ display: 'flex', gap: '16px' }}>
      {colorIcons}
    </div>
  )
}
allColors.storyName = 'All Colors'

const sizes: (keyof typeof standardTheme.spacing)[] = Object.keys(standardTheme.spacing) as (keyof typeof standardTheme.spacing)[]
const sizeIcons = sizes.map((size) => (
  <div key={size} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <h3>{size}</h3>
    <Icon icon='otter' size={size} />
  </div>
))
export const allSizes: Story = {
  render: (): JSX.Element => (
    <div style={{ display: 'flex', gap: '16px' }}>
      {sizeIcons}
    </div>
  )
}
