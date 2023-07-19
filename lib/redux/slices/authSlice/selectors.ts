/* Instruments */
import type { ReduxState } from '@/lib/redux'

export const selectAuthIsSubmitting = (state: ReduxState) => state.auth.isSubmitting
