import { lawCaseApi } from '../../../apis'
import { axiosErrorReturn } from '../utils/axios.error.return'

interface IMovementUpdatedInfo {
  date?: string
  title?: string
  type?: string
  content?: string
  done?: boolean
}

interface IMovementCreateInfo {
  date: 'string'
  title: 'string'
  type: 'string'
  content: 'string'
  caseId: 'string'
}

//date format: 'yyyy-mm-dd'
const getMovementsByDate = async (date: string) => {
  try {
    const response = await lawCaseApi.get(`/movement/user?date=${date}`)
    return {
      status: response.status,
      data: response.data,
    }
  } catch (error) {
    axiosErrorReturn(error)
  }
}

const updateMovement = async (id: string, data: IMovementUpdatedInfo) => {
  try {
    const response = await lawCaseApi.put(`/movement/${id}`, data)
    return {
      status: response.status,
      data: response.data,
    }
  } catch (error) {
    axiosErrorReturn(error)
  }
}

const getMovementsByCaseId = async (id: string) => {
  try {
    const response = await lawCaseApi.get(`/cases/${id}`)
    return {
      status: response.status,
      data: response.data,
    }
  } catch (error) {
    axiosErrorReturn(error)
  }
}

const createMovement = async (data: IMovementCreateInfo) => {
  try {
    const response = await lawCaseApi.post('/movement', data)
    return {
      status: response.status,
      data: response.data,
    }
  } catch (error) {
    axiosErrorReturn(error)
  }
}

const deleteMovement = async (id: string) => {
  try {
    const response = await lawCaseApi.delete(`/movement/${id}`)
    return {
      status: response.status,
      data: response.data,
    }
  } catch (error) {
    axiosErrorReturn(error)
  }
}

export default {
  getMovementsByDate,
  updateMovement,
  getMovementsByCaseId,
  createMovement,
  deleteMovement,
}
