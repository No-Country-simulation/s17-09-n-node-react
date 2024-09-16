import { lawCaseApi } from '../../../apis'
import { axiosErrorReturn } from '../utils/axios.error.return'

interface IMovementUpdatedInfo {
  date?: string
  title?: string
  type?: string
  content?: string
  done?: boolean
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

export default {
  getMovementsByDate,
  updateMovement,
}
