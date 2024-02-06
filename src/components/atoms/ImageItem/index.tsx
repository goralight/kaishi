import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'
import Icon from '../Icon'
import Pill from '../Pill'

interface ImageItemProps {
  image: string
  fileName: string
  onDelete: () => void
}

const Container = styled.div(
  ({ theme }): string => `
    display: flex;
    width: 100%;
    border: solid ${theme.palette.colors.background.light} ${theme.border.width.sm}px;
    background-color: ${theme.palette.colors.background.dark};
    border-radius: ${theme.border.radius}px;
    align-items: center;
    padding: ${theme.spacing.xxs}px;
    transition: all 0.2s ease;

    &:hover {
      background-color: ${theme.palette.colors.background.light};
      border-color: ${theme.palette.colors.background.main};
    }
  `
)

const Thmubnail = styled.img(
  ({ theme }): string => {
    const size = theme.spacing.xl * 2
    return `
    width: ${size}px;
    height: ${size}px;
    border-radius: ${theme.border.radius}px;
  `
  }
)

const DetailsContainer = styled.div(
  ({ theme }): string => {
    return `
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing.xxs}px;
    flex: 1;
    width: 40%;
    justify-content: flex-start;
    margin-left: ${theme.spacing.sm}px;
  `
  }
)

const InformationContainer = styled.div(
  ({ theme }): string => {
    return `
      display: flex;
      gap: ${theme.spacing.xxs}px;
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

const ImageItem = ({ image, fileName, onDelete }: ImageItemProps): JSX.Element => {

  const [isDeleteMode, setIsDeleteMode] = useState(false)
  const [imageXY, setImageXY] = useState({ x: 0, y: 0 })
  const [name, setName] = useState('')
  const [fileType, setFileType] = useState('')

  const handleViewClick = (): void => {
    console.log('Logged!')
  }

  const handleDeleteClick = (): void => {
    setIsDeleteMode(!isDeleteMode)
  }

  useEffect(() => {
    const img = new Image()
    img.src = image

    img.onload = (): void => {
      setImageXY({ x: img.naturalWidth, y: img.naturalHeight })
    }

    setName(fileName.split('.')[0])
    setFileType(fileName.split('.')[1].toUpperCase())

  }, [image, fileName])

  return (
    <Container>
      <Thmubnail src={image} alt={fileName} />
      <DetailsContainer>
        <InformationContainer>
          <Pill color='primary' colorVariant='dark' text={fileType} />
          <Pill color='secondary' colorVariant='dark' text={`${imageXY.x}x${imageXY.y}`} />
        </InformationContainer>
        <div>
          <StyledSpan title={fileName}>
            {name}
          </StyledSpan>
        </div>
      </DetailsContainer>
      <IconContainer>
        {isDeleteMode ? (
          <>
            <Icon icon='xmark' prefix='fas' color='secondary' onClick={handleDeleteClick} />
            <Icon icon='check' prefix='fas' color='primary' onClick={onDelete} />
          </>
        ) : (
          <>
            <Icon icon='eye' prefix='fas' color='foreground' onClick={handleViewClick} />
            <Icon icon='trash-can' prefix='fas' color='secondary' onClick={handleDeleteClick} />
          </>
        )}
      </IconContainer>
    </Container>
  )
}

export default ImageItem
