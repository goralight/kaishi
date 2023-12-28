import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { standardTheme } from '../../../theme'
import AddImage from '.'
import { useAppDispatch, useAppSelector } from '../../../store/store'
import Button from '../../atoms/Button'
import { removeImage } from '../../../store/features/storedImagesSlice'

const meta = {
  title: 'Molecules/AddImage',
  component: AddImage,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof AddImage>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
Primary.storyName = 'AddImage'
