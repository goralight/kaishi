import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import Checkbox from '.'

const meta = {
  title: 'Atoms/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered'
  },
  args: {
    checked: false,
    setChecked: (): void =>  {console.log('hello')},
    id: 'id',
    label: 'label for checkbox',
    align: 'left',
    color: 'primary',
    disabled: true

  },
  tags: ['autodocs']

} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(false)
    return (
      <Checkbox id={args.id} color={args.color} disabled={args.disabled} label={args.label} align={args.align} checked={checked} setChecked={setChecked}/>
    )
  }
}
Primary.storyName = 'Checkbox'
