/* Instruments */
import { authSlice, todoSlice } from './slices'

export const reducer = {
  auth: authSlice.reducer,
  todo: todoSlice.reducer,
}
