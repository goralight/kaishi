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
    id: 'widget1',
    onDeleteWidget: (id): void => { console.log('deleted', id) },
    editMode: false,
    children: <div></div>,
    wh: { w: 0, h: 0 },
    setWh: (): null => null,
    xy: { x: 0, y: 0 },
    setXy: (): null => null,
    originalWh: { w: 0, h: 0 },
    setOriginalWh: (): null => null,
    zIndex: 0,
    setZIndex: (): null => null
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Widget>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    id: 'sakura-gif',
    onDeleteWidget: (id): void => { console.log('deleted', id) },
    editMode: true,
    lockAspectRatio: false,
    children: (
      <img src='https://64.media.tumblr.com/fad5acf8e8720fe9096aa575117d48cd/tumblr_oedw5v5oev1rh2n3qo1_500.gif' />
    ),
    wh: { w: 0, h: 0 },
    setWh: (): null => null,
    xy: { x: 0, y: 0 },
    setXy: (): null => null,
    originalWh: { w: 0, h: 0 },
    setOriginalWh: (): null => null,
    zIndex: 0,
    setZIndex: (): null => null
  },
  render: (args) => {
    const [wh, setWh] = useState({ w: 200, h: 200 })
    const [xy, setXy] = useState({ x: 17, y: 17 })
    const [originalWh, setOriginalWh] = useState({ w: 200, h: 200 })
    const [zIndex, setZIndex] = useState(2)

    return (
      <>
        <Widget {...args} xy={xy} setXy={setXy} wh={wh} setWh={setWh} originalWh={originalWh} setOriginalWh={setOriginalWh} zIndex={zIndex} setZIndex={setZIndex} />
        <div style={{ backgroundSize: 'cover', backgroundImage: 'url(https://t0.gstatic.com/licensed-image?q=tbn:ANd9GcQehAwmdDN-tZv1jE-1a4uR49jCJzPp5x1gHWWm-13xcBTlaNwZTnFBnMUVsSZGCGgP)', width: '200px', height: '200px' }} />
      </>
    )
  }
}
Primary.storyName = 'Widget'

export const Other: Story = {
  args: {
    children: (
      <div style={{ backgroundColor: 'black' }}>
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
      </div>
    )
  },
  render: (args) => {
    const [wh, setWh] = useState({ w: 0, h: 0 })
    const [xy, setXy] = useState({ x: 0, y: 30 })
    const [originalWh, setOriginalWh] = useState({ w: 0, h: 0 })
    const [zIndex, setZIndex] = useState(2)
    return (
      <>
        <Widget {...args} xy={xy} setXy={setXy} wh={wh} setWh={setWh} originalWh={originalWh} setOriginalWh={setOriginalWh} zIndex={zIndex} setZIndex={setZIndex} />
        <div style={{ zIndex: 2, position: 'absolute' }}>
          my zindex is 2
        </div>
      </>
    )
  }
}
