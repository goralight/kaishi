import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import ImageItem from '.'

const meta = {
  title: 'Atoms/ImageItem',
  component: ImageItem,
  parameters: {
    layout: 'centered'
  },
  args: {
    image: 'https://picsum.photos/200',
    fileName: 'image.jpg',
    onDelete: (): void => { console.log('Logged!') }
  },
  tags: ['autodocs']
} satisfies Meta<typeof ImageItem>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
Primary.storyName = 'ImageItem'
