import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { Colors, standardTheme } from '../../../theme'
import SlideIn from '.'

const meta = {
  title: 'Atoms/SlideIn',
  component: SlideIn,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  args: {
    isVisible: false,
    children: <h1>Hello</h1>
  }
} satisfies Meta<typeof SlideIn>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  render: () => {
    const [isVisible, setIsVisible] = useState(false)
    return (
      <div>
        <SlideIn isVisible={isVisible} setIsVisible={setIsVisible}>
          <h1>Header</h1>
          <p>Content of the slider goes here...</p>
        </SlideIn>
        <button onClick={(): void => {setIsVisible(true)}}>hello</button>
      </div>
    )
  }
}

Primary.storyName = 'SlideIn'
