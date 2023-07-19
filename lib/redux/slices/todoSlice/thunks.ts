/* Core */
import { notification } from 'antd';

/* Instruments */
import {
  createItem,
  fetchItems,
  updateItem,
  deleteItem
} from './api'
import { selectTodoIsLoading, selectTodoRowInProgress } from './selectors'
import { todoSlice, TodoItem } from './slice'
import type { ReduxThunkAction } from '@/lib/redux'


export const createTodoItem =
  (data: TodoItem): ReduxThunkAction =>
  async (dispatch, getState) => {
    const rowInProgress = selectTodoRowInProgress(getState())

    if (rowInProgress !== 'new') {
      dispatch(todoSlice.actions.setRowInProgress('new'))

      try {
        const response = await createItem(data)
        dispatch(todoSlice.actions.addItem(response.data))
        return true
      } catch (err) {
        console.error(err)
        dispatch(todoSlice.actions.setRowInProgress(null))
        notification.error({ message: "Error", description: "Something went wrong!" })
        return false
      }
    }
  }

export const fetchTodoItems =
  (page: number, pageSize: number): ReduxThunkAction =>
  async (dispatch, getState) => {
    const isLoading = selectTodoIsLoading(getState())

    if (!isLoading) {
      dispatch(todoSlice.actions.setIsLoading(true))

      try {
        const response = await fetchItems(page, pageSize)
        dispatch(todoSlice.actions.setItems(response))
      } catch (err) {
        console.error(err)
        notification.error({ message: "Error", description: "Something went wrong!" })
      }

      dispatch(todoSlice.actions.setIsLoading(false))
    }
  }

export const updateTodoItem =
  (data: TodoItem): ReduxThunkAction =>
  async (dispatch, getState) => {
    const rowInProgress = selectTodoRowInProgress(getState())

    if (rowInProgress !== data.id) {
      dispatch(todoSlice.actions.setRowInProgress(data.id!))

      try {
        const response = await updateItem(data)
        dispatch(todoSlice.actions.updateItem(response.data))
        return true
      } catch (err) {
        console.error(err)
        dispatch(todoSlice.actions.setRowInProgress(null))
        notification.error({ message: "Error", description: "Something went wrong!" })
        return false
      }
    }
  }

export const deleteTodoItem =
  (id: string): ReduxThunkAction =>
  async (dispatch, getState) => {
    const rowInProgress = selectTodoRowInProgress(getState())

    if (rowInProgress !== id) {
      dispatch(todoSlice.actions.setRowInProgress(id))

      try {
        await deleteItem(id)
        dispatch(todoSlice.actions.removeItem(id))
        return true
      } catch (err) {
        console.error(err)
        dispatch(todoSlice.actions.setRowInProgress(null))
        notification.error({ message: "Error", description: "Something went wrong!" })
        return false
      }
    }
  }
