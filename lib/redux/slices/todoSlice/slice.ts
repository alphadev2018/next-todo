/* Core */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

const initialState: TodoSliceState = {
  items: {
    data: [],
    hasMore: false,
  },
  rowInProgress: null,
  isLoading: false,
}

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setRowInProgress: (state, action: PayloadAction<string | null>) => {
      state.rowInProgress = action.payload
    },
    setItems: (state, action: PayloadAction<TodoItems>) => {
      const { items } = state;

      state.items = {
        data: [
          ...items.data,
          ...action.payload.data,
        ],
        hasMore: action.payload.hasMore
      }
    },
    addItem: (state, action: PayloadAction<TodoItem>) => {
      const { items } = state;

      state.items = {
        data: [
          action.payload,
          ...items.data,
        ],
        hasMore: items.hasMore
      }
      state.rowInProgress = null
    },
    updateItem: (state, action: PayloadAction<TodoItem>) => {
      const { items } = state;

      state.items = {
        data: items.data.map((el) => {
          if (el.id === action.payload.id) {
            return action.payload;
          }

          return el;
        }),
        hasMore: items.hasMore
      }
      state.rowInProgress = null
    },
    removeItem: (state, action: PayloadAction<string>) => {
      const { items } = state;

      state.items = {
        data: items.data.filter((el) => el.id !== action.payload),
        hasMore: items.hasMore
      }
      state.rowInProgress = null
    },
  },
})

/* Types */
export interface TodoItem {
  id?: string
  label: string
  isCompleted: boolean
}
export interface TodoItems {
  data: TodoItem[]
  hasMore: boolean
}
export interface TodoSliceState {
  items: TodoItems
  isLoading: boolean
  rowInProgress: string | null
}
