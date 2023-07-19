/* Instruments */
import type { ReduxState } from '@/lib/redux'

export const selectTodoItems = (state: ReduxState) => state.todo.items

export const selectTodoIsLoading = (state: ReduxState) => state.todo.isLoading

export const selectTodoRowInProgress = (state: ReduxState) => state.todo.rowInProgress
