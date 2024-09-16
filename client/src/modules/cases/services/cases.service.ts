import { lawCaseApi } from '../../../apis'
import { axiosErrorReturn } from '../utils/axios.error.return'

interface ICaseCreatedInfo {
  caseName: string
  jury: string
  caseNumber: string
  applicant: string
  respondent: string
  type: string
  status: string
  userId: string
}

interface ICaseUpdatedInfo {
  caseName: string
  jury: string
  caseNumber: string
  applicant: string
  respondent: string
  type: string
  status: string
}

const createCase = async (data: ICaseCreatedInfo) => {
  try {
    const response = await lawCaseApi.post('/cases', data)
    return {
      status: response.status,
      data: response.data,
    }
  } catch (error) {
    axiosErrorReturn(error)
  }
}

const getCasesList = async () => {
  try {
    const response = await lawCaseApi.get('/cases')
    return {
      status: response.status,
      data: response.data,
    }
  } catch (error) {
    axiosErrorReturn(error)
  }
}

const getCasesListByUser = async () => {
  try {
    const response = await lawCaseApi.get(`/cases/user`)
    return {
      status: response.status,
      data: response.data,
    }
  } catch (error) {
    axiosErrorReturn(error)
  }
}

const updateCase = async (id: string, data: ICaseUpdatedInfo) => {
  try {
    const response = await lawCaseApi.put(`/cases/${id}`, data)
    return {
      status: response.status,
      data: response.data,
    }
  } catch (error) {
    axiosErrorReturn(error)
  }
}

const deleteCase = async (id: string) => {
  try {
    const response = await lawCaseApi.delete(`/cases/${id}`)
    return {
      status: response.status,
      data: response.data,
    }
  } catch (error) {
    axiosErrorReturn(error)
  }
}

export default {
  createCase,
  getCasesList,
  getCasesListByUser,
  updateCase,
  deleteCase,
}
