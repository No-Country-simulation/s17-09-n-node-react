import axios from 'axios'
import { lawCaseApi } from '../../../apis'

interface CaseCreatedInfoType {
  caseName: string
  jury: string
  caseNumber: string
  applicant: string
  respondent: string
  type: string
  status: string
  userId: string
}

interface CaseUpdatedInfoType {
  caseName: string
  jury: string
  caseNumber: string
  applicant: string
  respondent: string
  type: string
  status: string
}

const createCase = async (data: CaseCreatedInfoType) => {
  try {
    const response = await lawCaseApi.post('/cases', data)
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

const getCasesList = async () => {
  try {
    const response = await lawCaseApi.get('/cases')
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

const getCasesListByUser = async (token: string) => {
  try {
    const response = await lawCaseApi.get(`/cases/user`, {
      headers: { Authorization: `Bearer ${token}` },
    })
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

const updateCase = async (id: string, data: CaseUpdatedInfoType) => {
  try {
    const response = await lawCaseApi.put(`/cases/${id}`, data)
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

const deleteCase = async (id: string) => {
  try {
    const response = await lawCaseApi.delete(`/cases/${id}`)
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
  createCase,
  getCasesList,
  getCasesListByUser,
  updateCase,
  deleteCase,
}
