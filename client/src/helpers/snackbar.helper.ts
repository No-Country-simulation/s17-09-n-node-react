import {
  enqueueSnackbar,
  type VariantType,
  type SnackbarOrigin,
} from 'notistack'

import { StatusRespMsg } from '../interfaces'

export const showSnackbar = (
  message: string,
  variant: VariantType,
  anchorOrigin?: SnackbarOrigin,
  autoHideDuration: number = 5000,
) => {
  enqueueSnackbar(message, { variant, anchorOrigin, autoHideDuration })
}

export const showStatusSnackbar = (
  { ok, msg }: StatusRespMsg,
  anchorOrigin?: SnackbarOrigin,
  autoHideDuration: number = 5000,
) => {
  if (ok) {
    enqueueSnackbar(msg, { variant: 'success', anchorOrigin, autoHideDuration })
  } else {
    enqueueSnackbar(msg, { variant: 'error', anchorOrigin, autoHideDuration })
  }
}
