import styled from '@emotion/styled'
import React, { useState } from 'react'
import Icon from '../Icon'

interface ImageItemProps {
  image: string
  name: string
  onDelete: () => void
}

const Container = styled.div(
  ({ theme }): string => `
    display: flex;
    width: 100%;
    border: solid ${theme.palette.colors.grey.main} ${theme.border.width.sm}px;
    background-color: ${theme.palette.colors.grey.dark};
    border-radius: ${theme.border.radius.sm}px;
    align-items: center;
    padding: ${theme.spacing.xxs}px;
  `
)

const Thmubnail = styled.img(
  ({ theme }): string => {
    const size = theme.spacing.xl * 2
    return `
    width: ${size}px;
    height: ${size}px;
    border-radius: ${theme.border.radius.sm}px;
  `
  }
)

const NameContainer = styled.div(
  ({ theme }): string => {
    return `
    display: flex;
    flex: 1;
    width: 40%;
    justify-content: flex-start;
    margin-left: ${theme.spacing.sm}px;
  `
  }
)

const StyledSpan = styled.span(
  (): string => {
    return `
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `
  }
)

const IconContainer = styled.div(
  ({ theme }): string => {
    return `
    display: flex;
    width: 52px;
    justify-content: center;
    gap: ${theme.spacing.xs}px;
  `
  }
)

const ImageItem = ({ image, name, onDelete }: ImageItemProps): JSX.Element => {

  const [isDeleteMode, setIsDeleteMode] = useState(false)

  const handleViewClick = (): void => {
    console.log('Logged!')
  }

  const handleDeleteClick = (): void => {
    setIsDeleteMode(!isDeleteMode)
  }

  console.log('isDeleteMode', isDeleteMode)

  return (
    <Container>
      <Thmubnail src={image} alt={name} />
      <NameContainer>
        <StyledSpan>
          {name}
        </StyledSpan>
      </NameContainer>
      <IconContainer>
        {isDeleteMode ? (
          <>
            <Icon icon='xmark' prefix='fas' color='red' size='md' onClick={handleDeleteClick} />
            <Icon icon='check' prefix='fas' color='green' size='md' onClick={onDelete} />
          </>
        ) : (
          <>
            <Icon icon='eye' prefix='fas' color='white' size='md' onClick={handleViewClick} />
            <Icon icon='trash-can' prefix='fas' color='red' size='md' onClick={handleDeleteClick} />
          </>
        )}
      </IconContainer>
    </Container>
  )
}

export default ImageItem
