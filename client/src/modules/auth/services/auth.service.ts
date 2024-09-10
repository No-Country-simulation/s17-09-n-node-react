import axios from 'axios'
import { lawCaseApi } from '../../../apis'

export const registerUser = async (data: {
  email: string
  name: string
  lastName: string
  password: string
}) => {
  try {
    const response = await lawCaseApi.post('/user/register', data)
    return {
      status: response.status,
      data: response.data,
    }
  } catch (error) {
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
}
