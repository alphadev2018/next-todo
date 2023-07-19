/* Core */
import { notification } from 'antd';

/* Instruments */
import { sendLoginReq, sendLogoutReq } from './api'
import { selectAuthIsSubmitting } from './selectors'
import { authSlice, LoginData } from './slice'
import type { ReduxThunkAction } from '@/lib/redux'


export const doLogin =
  (data: LoginData): ReduxThunkAction =>
  async (dispatch, getState) => {
    const isSubmitting = selectAuthIsSubmitting(getState())

    if (!isSubmitting) {
      dispatch(authSlice.actions.setIsSubmitting(true))

      try {
        const response = await sendLoginReq(data)

        if (response.message) {
          notification.error({ message: "Error", description: response.message })
        } else {
          location.href = "/"
        }
      } catch (err) {
        console.error("Error: ", err)
        notification.error({ message: "Error", description: "Something went wrong!" })
      }

      dispatch(authSlice.actions.setIsSubmitting(false))
    }
  }

export const doLogout = (): ReduxThunkAction =>
  async (dispatch, getState) => {
    const isSubmitting = selectAuthIsSubmitting(getState())

    if (!isSubmitting) {
      dispatch(authSlice.actions.setIsSubmitting(true))

      try {
        await sendLogoutReq()

        location.href = "/login"
      } catch (err) {
        console.error("Error: ", err)
        notification.error({ message: "Error", description: "Something went wrong!" })
      }

      dispatch(authSlice.actions.setIsSubmitting(false))
    }
  }
