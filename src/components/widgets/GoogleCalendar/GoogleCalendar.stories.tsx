import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import GoogleCalendar from '.'

const meta = {
  title: 'Widgets/GoogleCalendar',
  component: GoogleCalendar,
  parameters: {
    layout: 'centered'
  },
  args: {
    id: 'Calendar1',
    name: 'Calendar Example',
    editMode: false,
    wh: { w: 0, h: 0 },
    setWh: (): null => null,
    xy: { x: 0, y: 0 },
    setXy: (): null => null,
    originalWh: { w: 0, h: 0 },
    setOriginalWh: (): null => null,
    zIndex: 0,
    setZIndex: (): null => null,
    scale: { x: 1, y: 1 },
    setScale: (): null => null,
    src: 'https://calendar.google.com/calendar/embed?height=600&wkst=2&bgcolor=%23ffffff&ctz=Europe%2FLondon&showTitle=0&showNav=1&showDate=1&showPrint=0&showTabs=0&showCalendars=1&showTz=1&src=Njk1M2E3MDkwZTY3NjQ4OWYwYTM0N2YwMWIzMDNjNTkwODc0NTZlY2UyZDcxYzJmNWU4MTAyZWRlYmM2YTEyZUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=ZW4udWsjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20&color=%23D50000&color=%230B8043',
    calendarWidth: 700,
    calendarHeight: 700
  },
  tags: ['autodocs']
} satisfies Meta<typeof GoogleCalendar>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  render: (args) => {
    const [wh, setWh] = useState({ w: 0, h: 0 })
    const [xy, setXy] = useState({ x: 0, y: 0 })
    const [originalWh, setOriginalWh] = useState({ w: 0, h: 0 })
    const [zIndex, setZIndex] = useState(2)
    const [scale, setScale] = useState({ x: 1, y: 1 })

    return (
      <GoogleCalendar
        {...args}
        xy={xy}
        setXy={setXy}
        wh={wh}
        setWh={setWh}
        originalWh={originalWh}
        setOriginalWh={setOriginalWh}
        zIndex={zIndex}
        setZIndex={setZIndex}
        scale={scale}
        setScale={setScale}
      />
    )
  }
}
Primary.storyName = 'GoogleCalendar'
