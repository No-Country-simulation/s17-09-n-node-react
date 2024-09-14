import axios from 'axios'

export const axiosErrorReturn = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    return {
      status: error.response?.status || 500,
      message:
        error.response?.data?.message || 'Error inesperado en el servidor.',
    }
  }
  return {
    status: 500,
    message: 'Error en el servidor.',
  }
}
