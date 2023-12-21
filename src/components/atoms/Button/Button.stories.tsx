import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { standardTheme } from '../../../theme'
import Button from '.'

const meta = {
  title: 'Atoms/Button',
  component: Button,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  args: {
    color: 'grey',
    colorVariant: 'main',
    size: 'md',
    disabled: false,
    children: 'Button Text'
  }
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
Primary.storyName = 'Button'

const buttons: JSX.Element[] = []

const variants = Object.keys(standardTheme.palette.colors.grey)
const first = variants.shift()
if (first) {
  variants.push(first)
}

Object.keys(standardTheme.palette.colors).forEach((color) => {
  buttons.push(
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <h3 style={{ textAlign: 'center', marginBottom: '12px' }}>{color}</h3>
      <div style={{ display: 'flex', flexDirection: 'column', width: '150px', gap: '12px' }} key={color}>
        {variants.map((colorVariant) => {
          const c = color as keyof typeof standardTheme.palette.colors
          const cv = colorVariant as keyof typeof standardTheme.palette.colors.grey

          if (c !== 'grey' && (cv === 'white' || cv === 'black')) {
            return null
          }

          return (
            <Button color={c} colorVariant={cv} size='md' key={colorVariant} onClick={(): void => { null }}>
              {color}/{colorVariant}
            </Button>
          )
        })}
      </div>
    </div>
  )
})

buttons.unshift(
  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
    <div style={{ height: '47px' }} />
    {variants.map((colorVariant) => (
      <div style={{ height: '47px', display: 'flex', alignItems: 'center' }} key={colorVariant}>
        <h3 style={{ textAlign: 'center', margin: '0' }}>{colorVariant}</h3>
      </div>
    ))}
  </div>
)

export const allColors: Story = {
  render() {
    return (
      <div style={{ display: 'flex', gap: '12px' }}>
        {buttons}
      </div>
    )
  }
}

const sizes: JSX.Element[] = []

Object.keys(standardTheme.spacing).forEach((size) => {
  const s = size as keyof typeof standardTheme.spacing
  sizes.push(
    <Button size={s} key={size} onClick={(): void => { null }} color='grey' colorVariant='dark'>
      {size}
    </Button>
  )
})

export const allSizes: Story = {
  render() {
    return (
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        {sizes}
      </div>
    )
  }
}
