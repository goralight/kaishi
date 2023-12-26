import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useAppDispatch } from '../../../store/store'
import { addImage } from '../../../store/features/storedImagesSlice'
import AddFile from '../../atoms/AddFile'
import styled from '@emotion/styled'

const AddImage = (): JSX.Element => {

  const dispatch = useAppDispatch()

  const Container = styled.div(
    (): string => `
      display: flex;
      align-items: center;
    `
  )

  const toBase64 = (image: Blob): Promise<unknown> => new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.readAsDataURL(image)
    reader.onload = (): void => resolve(reader.result)
    reader.onerror = reject
  })

  const handleFileUpload = (file: FileList | null): void => {
    if (!file) {
      return
    }

    const image = file[0]

    toBase64(image)
      .then((result) => {
        const data = result as string

        dispatch(addImage({ id: uuidv4(), name: image.name, type: image.type, data }))
      })
      .catch((err) => {
        console.error(err)
      })
  }

  return (
    <Container>
      <div>
        <AddFile text='Add Image' onFileUpload={(e): void => handleFileUpload(e)} size='xs' id='backgroundImage' accept="image/*" />
      </div>
    </Container>
  )
}

export default AddImage
