import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../store/store'
import AddImage from '../AddImage'
import ImageItem from '../../atoms/ImageItem'
import { removeImage } from '../../../store/features/storedImagesSlice'
import styled from '@emotion/styled'

const Container = styled.div(
  (): string => `
    display: flex;
    flex-direction: column;
  `
)

const AddImageContainer = styled.div(
  ({ theme }): string => `
    margin-bottom: ${theme.spacing.xs}px;
  `
)

const ImagesContainer = styled.div(
  ({ theme }): string => `
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing.xs}px;
  `
)

const StoredImageList = (): JSX.Element => {
  const dispatch = useAppDispatch()

  const { images } = useAppSelector((state) => state.storedImages)

  const handleImageRemove = (id: string): void => {
    dispatch(removeImage(id))
  }

  return (
    <Container>
      <AddImageContainer>
        <AddImage />
      </AddImageContainer>
      <ImagesContainer>
        {images.map((image) => (
          <ImageItem key={image.id} image={image.data} name={image.name} onDelete={(): void => { handleImageRemove(image.id) }} />
        )).reverse()}
      </ImagesContainer>
    </Container>
  )
}

export default StoredImageList
