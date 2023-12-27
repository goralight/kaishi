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
    border: solid ${theme.palette.colors.grey.main} ${theme.border.width.sm}px;
    background-color: ${theme.palette.colors.grey.dark};
    border-radius: ${theme.border.radius.sm}px;
    align-items: center;
    padding: ${theme.spacing.xxs}px;
    transition: all 0.2s ease;

    &:hover {
      background-color: ${theme.palette.colors.grey.main};
      border-color: ${theme.palette.colors.grey.light};
    }
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

const NameContainer = styled.div(
  ({ theme }): string => {
    return `
    
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
          <Pill color='red' colorVariant='dark'>{fileType}</Pill>
          <Pill color='blue' colorVariant='dark'>{imageXY.x}x{imageXY.y}</Pill>
        </InformationContainer>
        <NameContainer>
          <StyledSpan title={fileName}>
            {name}
          </StyledSpan>
        </NameContainer>
      </DetailsContainer>
      <IconContainer>
        {isDeleteMode ? (
          <>
            <Icon icon='xmark' prefix='fas' color='red' onClick={handleDeleteClick} />
            <Icon icon='check' prefix='fas' color='green' onClick={onDelete} />
          </>
        ) : (
          <>
            <Icon icon='eye' prefix='fas' color='white' onClick={handleViewClick} />
            <Icon icon='trash-can' prefix='fas' color='red' onClick={handleDeleteClick} />
          </>
        )}
      </IconContainer>
    </Container>
  )
}

export default ImageItem
