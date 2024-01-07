import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import ColorSelector from '.'

const meta = {
  title: 'Atoms/ColorSelector',
  component: ColorSelector,
  parameters: {
    layout: 'centered'
  },
  args: {
    color: '#9b1212',
    name: 'Primary'
  },
  tags: ['autodocs']
} satisfies Meta<typeof ColorSelector>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  render: (args): JSX.Element => {
    const [color, setColor] = useState('#9b1212')

    return (
      <ColorSelector name={args.name} color={color} setColor={setColor} />
    )
  }
}
Primary.storyName = 'ColorPicker'
