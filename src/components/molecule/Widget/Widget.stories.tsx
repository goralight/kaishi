import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import Widget from '.'
import Button from '../../atoms/Button'

const meta = {
  title: 'Molecules/Widget',
  component: Widget,
  parameters: {
    layout: 'centered'
  },
  args: {
    children: (
      <>
        <div>children</div>
        <Button onClick={(): void => { console.log('clicked') }} size='xs'>Button</Button>
        <span>some text</span>
        <div>
          <div>some more text</div>
          <span>awd</span>
          <span>lots and lots and lots and lots of text</span>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button onClick={(): void => { console.log('clicked') }} size='xs'>Button</Button>
          <Button onClick={(): void => { console.log('clicked') }} size='xs'>Button</Button>
          <Button onClick={(): void => { console.log('clicked') }} size='xs'>Button</Button>
          <Button onClick={(): void => { console.log('clicked') }} size='xs'>Button</Button>
          <Button onClick={(): void => { console.log('clicked') }} size='xs'>Button</Button>
          <Button onClick={(): void => { console.log('clicked') }} size='xs'>Button</Button>
          <Button onClick={(): void => { console.log('clicked') }} size='xs'>Button</Button>
          <Button onClick={(): void => { console.log('clicked') }} size='xs'>Button</Button>
          <Button onClick={(): void => { console.log('clicked') }} size='xs'>Button</Button>
          <Button onClick={(): void => { console.log('clicked') }} size='xs'>Button</Button>
        </div>
        <div>
          <span>mmm text</span>
        </div>
      </>
    )
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Widget>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
Primary.storyName = 'Widget'
