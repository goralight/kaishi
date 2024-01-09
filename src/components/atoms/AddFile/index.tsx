import React from 'react'
import { Color, Colors, ExtraSizing } from '../../../theme'
import { getColor } from '../utils'
import styled from '@emotion/styled'

interface AddFileProps {
  id: string
  onFileUpload: (file: FileList | null) => void
  accept?: string
  size?: keyof ExtraSizing
  color?: keyof Colors
  colorVariant?: keyof Color
  disabled?: boolean
  children: React.ReactNode
}

interface StyledInputProps {
  color: keyof Colors
  colorVariant: keyof Color
  scale: keyof ExtraSizing
  disabled: boolean
}

const StyledLabel = styled.label<StyledInputProps>(
  ({ theme, color, colorVariant, scale, disabled }): string => {
    const { backgroundColor, hoverColor, fontColor } = getColor(theme, color, colorVariant)

    return `
      display: block;
      background-color: ${backgroundColor};
      color: ${fontColor};
      cursor: ${disabled ? 'default' : 'pointer'};
      border: none;
      border-radius: ${theme.border.radius.sm}px;
      padding: ${theme.spacing[scale]}px;
      transition: background-color 0.2s ease;

      &:hover {
        background-color: ${hoverColor};
      }
    `
  }
)

const StyledInput = styled.input(
  (): string => {
    return `
      display: none;
    `
  }
)

const AddFile = ({
  id,
  children,
  accept = '*',
  size = 'md',
  color = 'primary',
  colorVariant = 'main',
  disabled = false,
  onFileUpload
}: AddFileProps): JSX.Element => {
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    onFileUpload(e.currentTarget.files)
    e.currentTarget.value = ''
  }

  return (
    <div>
      <StyledLabel
        htmlFor={id}
        color={color}
        colorVariant={colorVariant}
        scale={size}
        disabled={disabled}
      >
        {children}
      </StyledLabel>
      <StyledInput
        id={id}
        type='file'
        onChange={(e): void => { handleOnChange(e) }}
        accept={accept}
      />
    </div>
  )
}

export default AddFile
