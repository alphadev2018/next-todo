/* Core */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

const initialState: AuthSliceState = {
  isSubmitting: false,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsSubmitting: (state, action: PayloadAction<boolean>) => {
      state.isSubmitting = action.payload
    },
  },
})

/* Types */
export interface LoginData {
  email: string
  password: string
}
export interface AuthSliceState {
  isSubmitting: boolean
}
