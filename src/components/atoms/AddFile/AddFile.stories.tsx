import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { standardTheme } from '../../../theme'
import AddFile from '.'

const meta = {
  title: 'Atoms/AddFile',
  component: AddFile,
  parameters: {
    layout: 'centered'
  },
  args: {
    text: 'Add File',
    id: 'AddFile'
  },
  tags: ['autodocs']
} satisfies Meta<typeof AddFile>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  render: (): JSX.Element => (
    <AddFile text='Add File' onFileUpload={(): void => console.log('worked!')} size='xs' id='AddFile' />
  )
}
Primary.storyName = 'AddFile'
