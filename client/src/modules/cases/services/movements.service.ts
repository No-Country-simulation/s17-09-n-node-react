import axios from 'axios'
import { lawCaseApi } from '../../../apis'

interface MovementCreateInfoType {
  date: 'string'
  title: 'string'
  type: 'string'
  content: 'string'
  done: true
  name: 'string'
  lastName: 'string'
  imageUrl: 'string'
}

const createMovement = async (data: MovementCreateInfoType) => {
  try {
    const response = await lawCaseApi.post('/movements', data)
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

const getMovementsList = async () => {
  try {
    const response = await lawCaseApi.get('/movements')
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

const updateMovement = async (id: string) => {
  try {
    const response = await lawCaseApi.put(`/movements/${id}`)
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

const deleteMovement = async (id: string) => {
  try {
    const response = await lawCaseApi.delete(`/movements/${id}`)
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

export default {
  createMovement,
  getMovementsList,
  updateMovement,
  deleteMovement,
}
