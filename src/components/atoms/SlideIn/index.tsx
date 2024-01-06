import React from 'react'
import styled from '@emotion/styled'
import Icon from '../Icon'

interface SlideInProps {
  isVisible: boolean
  children: React.ReactNode
  setIsVisible: ( close: boolean ) => void
}

interface SlideInStyledProps {
  containerIsVisible: boolean
}

const Container = styled.div<SlideInStyledProps>(
  ({ theme, containerIsVisible }): string => {
    return `
    padding: ${theme.spacing.xl}px;
    background-color: ${theme.palette.colors.grey.dark}88;
    backdrop-filter: blur(4px);
    width: calc(100% - ${theme.spacing.xl}px * 2 + 1px);
    min-height: calc(100% - ${theme.spacing.xl}px * 2);
    position: absolute;
    top: 0;
    left: ${containerIsVisible ? '0' : '100%'};
    transition: left 1.2s ease;
    z-index: 999;
    
    `
  }
)

const IconContainer = styled.div(
  ({ theme }): string => {
    return `
    position: absolute;
    top: 16px;
    right: 16px;
    `
  }
)

const SlideIn = ({
  isVisible = false,
  setIsVisible,
  children
}: SlideInProps): JSX.Element => {
  return (
    <Container containerIsVisible={isVisible}>
      <IconContainer>
        <Icon
          color="secondary"
          icon="xmark"
          onClick={(): void => {setIsVisible(false)}}
          prefix="fas"
          size="xxl"
        />
      </IconContainer>
      {children}
    </Container>
  )
}

export default SlideIn
