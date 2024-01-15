import styled from '@emotion/styled'
import React from 'react'
import Icon from '../Icon'
import { Colors } from '../../../theme'

type Align = 'left' | 'right'

interface CheckboxProps {
  checked: boolean
  onChange: () => void
  label?: string
  id?: string
  align?: Align
  color?: keyof Colors
  disabled?: boolean
}

const Container = styled.div<{align: Align}>(
  ({ align, theme }): string => {
    return `
      display: flex;
      flex-direction: ${align === 'left' ? 'row' : 'row-reverse'};
      align-items: center;
      gap: ${theme.spacing.xxs}px;
    `
  }
)

const StyledLabel = styled.label<{disabled: boolean}>(
  ({ theme, disabled }): string => {
    return `
      color: ${disabled ? theme.palette.colors.disabled.main : theme.palette.colors.foreground.main};
      cursor: ${disabled ? 'intial' : 'pointer'};
    `
  }
)

const Checkbox = ({
  checked,
  onChange,
  label,
  id,
  align = 'left',
  color = 'foreground',
  disabled = false
}: CheckboxProps): JSX.Element => {
  const handleOnChange = (): void => {
    if (disabled) {
      return
    }
    onChange()
  }

  let iconColor = color

  if (disabled) {
    iconColor = 'disabled'
  } else {
    if (!checked) {
      iconColor = 'foreground'
    }
  }

  return (
    <Container align={align}>
      {/* <input type="checkbox" id={id} checked={checked} onChange={handleOnChange}/> */}
      <Icon id={id} disabled={disabled} icon={checked ? 'check-square' : 'square'} prefix='fas' color={iconColor} onClick={handleOnChange}/>
      <StyledLabel htmlFor={id} disabled={disabled} onClick={handleOnChange}>{label}</StyledLabel>
    </Container>
  )
}

export default Checkbox
