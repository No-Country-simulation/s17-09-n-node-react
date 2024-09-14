import axios from 'axios'
import { lawCaseApi } from '../../../apis'

export interface Case {
  caseName:   string
  jury:       string
  caseNumber: string
  applicant:  string
  respondent: string
  type:       typeTipo 
  status:     typeStatus 
} 

export type typeStatus = 'INITIATED' | 'EVIDENCE' | 'JUDGMENT' | 'CLOSED';
export type typeTipo = 'SUCCESSION' | 'EXECUTION' | 'TERMINATION'| 'DAMAGES_AND_LOSSES' |'CONTRACT_DISPUTE' |'FAMILY_LAW'| 'CRIMINAL'| 'PROPERTY_DISPUTE' |'PERSONAL_INJURY' |'INTELLECTUAL_PROPERTY'



const createCase = async (data: Case) => {
  try {
    const response = await lawCaseApi.post('/cases', data)
    return {
      status: response.status,
      data: response.data,
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error)
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

const updateCase = async (id: string, data: Case) => {
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
    const response = await lawCaseApi.put(`/cases/${id}`)
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

const getCaseById = async (id: string) => {
  let response 
 try {
  response = await lawCaseApi.get(`/cases/${id}`)
  return {
    status: response.status,
    data: response.data,
  }
 } catch (error) {
  console.log('axios error: ', response)
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
  getCaseById
}
