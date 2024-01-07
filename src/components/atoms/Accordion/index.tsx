import styled from '@emotion/styled'
import React, { useState } from 'react'

interface AccordionProps {
  label: string
  color?: string
  isOpenOnMount?: boolean
  children: React.ReactNode
}

const Container = styled.div(
  ({ theme }): string => {
    return `
      width: 100%;
      height: initial;
    `
  }
)

const StyledDetails = styled.details(
  ({ theme }): string => {
    return `
      display: flex;
      width: 100%;
      &[open] {
        summary {
          border-bottom-left-radius: 0;
          border-bottom-right-radius: 0;
        }
      }
    `
  }
)

const StyledSummary = styled.summary<{ color: string | undefined }>(
  ({ theme, color }): string => {
    return `
      padding: ${theme.spacing.xs}px;
      background-color: ${color ? color : theme.palette.colors.grey.main};
      border-radius: ${theme.border.radius.sm}px;
      cursor: pointer;
      list-style: none;
    `
  }
)

const Content = styled.div(
  ({ theme }): string => {
    return `
      padding: ${theme.spacing.xs}px;
      background-color: ${theme.palette.colors.grey.dark};
      border-bottom-left-radius: ${theme.border.radius.sm}px;
      border-bottom-right-radius: ${theme.border.radius.sm}px;
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
        <Content>
          {children}
        </Content>
      </StyledDetails>
    </Container>
  )
}

export default Accordion
