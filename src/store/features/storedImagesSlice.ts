import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface StoredImageState {
  id: string
  name: string
  type: string // png | jpg | jpeg | gif
  data: string // base64
}

export interface StoredImagesState {
  images: StoredImageState[]
}

const initialState: StoredImagesState = {
  images: []
}

export const backgroundImageSlice = createSlice({
  name: 'storedImages',
  initialState: initialState,
  reducers: {
    addImage: (state, action: PayloadAction<StoredImageState>) => {
      state.images = [...state.images, action.payload]
    },
    removeImage: (state, action: PayloadAction<string>) => {
      state.images = state.images.filter((image) => image.id !== action.payload)
    }
  }
})

export default backgroundImageSlice.reducer
export const { addImage, removeImage } = backgroundImageSlice.actions
