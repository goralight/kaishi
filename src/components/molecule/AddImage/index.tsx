import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useAppDispatch, useAppSelector } from '../../../store/store'
import { addImage } from '../../../store/features/storedImagesSlice'
import AddFile from '../../atoms/AddFile'
import styled from '@emotion/styled'
import StatusMessage from '../../atoms/StatusMessage'

const Container = styled.div(
  (): string => `
    display: flex;
    align-items: center;
  `
)

const AddImage = (): JSX.Element => {

  const dispatch = useAppDispatch()

  const { images } = useAppSelector((state) => state.storedImages)

  const [error, setError] = useState('')

  const toBase64 = (image: Blob): Promise<unknown> => new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.readAsDataURL(image)
    reader.onload = (): void => resolve(reader.result)
    reader.onerror = reject
  })

  const handleFileUpload = (file: FileList | null): void => {
    console.log('Logged!', file)
    if (!file || file.length === 0) {
      return
    }

    const image = file[0]

    const duplicate = images.find((img) => img.name === image.name && img.type === image.type)

    if (duplicate) {
      setError('Image already exists')
      return
    } else {
      setError('')
    }

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
      <AddFile onFileUpload={(e): void => handleFileUpload(e)} size='xs' id='backgroundImage' accept="image/*">Add Image</AddFile>
      {error ? <StatusMessage type='error' style={{ marginLeft: '12px' }} onClick={(): void => { setError('') }}>{error}</StatusMessage> : null}
    </Container>
  )
}

export default AddImage
