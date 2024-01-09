import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import ColorPicker from '.'

const meta = {
  title: 'Atoms/ColorPicker',
  component: ColorPicker,
  parameters: {
    layout: 'centered'
  },
  args: {
    color: '#9b1212',
    disabled: false
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ColorPicker>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  render: (): JSX.Element => {
    const [color, setColor] = useState('#9b1212')

    return (
      <ColorPicker color={color} setColor={setColor} />
    )
  }
}
Primary.storyName = 'ColorPicker'
