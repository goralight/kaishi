import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { standardTheme } from '../../../theme'
import { useAppDispatch, useAppSelector } from '../../../store/store'
import Button from '../../atoms/Button'
import { removeImage } from '../../../store/features/storedImagesSlice'
import StoredImageList from '.'

const meta = {
  title: 'Molecules/StoredImageList',
  component: StoredImageList,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof StoredImageList>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
Primary.storyName = 'StoredImageList'
