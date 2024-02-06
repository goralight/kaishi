import styled from '@emotion/styled'
import React from 'react'
import { Colors } from '../../../theme'

interface AccordionProps {
  label: string
  color?: keyof Colors
  isOpenOnMount?: boolean
  children: React.ReactNode
}

const Container = styled.div(
  (): string => {
    return `
      width: 100%;
      height: initial;
    `
  }
)

const StyledDetails = styled.details(
  (): string => {
    return `
      display: flex;
      width: 100%;
      &[open] {
        & > summary {
          border-bottom-left-radius: 0;
          border-bottom-right-radius: 0;
        }
      }
    `
  }
)

const StyledSummary = styled.summary<{ color: keyof Colors | undefined }>(
  ({ theme, color }): string => {
    return `
      padding: ${theme.spacing.xs}px;
      background-color: ${color ? theme.palette.colors[color].main : theme.palette.colors.background.main};
      border-radius: ${theme.border.radius}px;
      cursor: pointer;
      list-style: none;
    `
  }
)

const Content = styled.div<{ color?: keyof Colors }>(
  ({ theme, color }): string => {
    return `
      padding: ${theme.spacing.xs}px;
      background-color: ${color ? theme.palette.colors[color].dark : theme.palette.colors.background.dark};
      border-bottom-left-radius: ${theme.border.radius}px;
      border-bottom-right-radius: ${theme.border.radius}px;
    `
  }
)

const Accordion: React.FC<AccordionProps> = ({
  label,
  isOpenOnMount = false,
  children,
  color
}) => {
  return (
    <Container>
      <StyledDetails open={isOpenOnMount}>
        <StyledSummary color={color}>{label}</StyledSummary>
        <Content color={color}>
          {children}
        </Content>
      </StyledDetails>
    </Container>
  )
}

export default Accordion
