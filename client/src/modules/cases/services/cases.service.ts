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
  userId:     string   
} 

export type typeStatus = 'INITIATED' | 'EVIDENCE' | 'JUDGMENT' | 'CLOSED';
export type typeTipo = 'SUCCESSION' | 'EXECUTION' | 'TERMINATION'| 'DAMAGES_AND_LOSSES' |'CONTRACT_DISPUTE' |'FAMILY_LAW'| 'CRIMINAL'| 'PROPERTY_DISPUTE' |'PERSONAL_INJURY' |'INTELLECTUAL_PROPERTY'



/*const createCase = async (data: Case) => {
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
}*/

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

const getCasesListByUserId = async (userId: string) => {
  try {
    const response = await lawCaseApi.get(`/cases/user/${userId}`)
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

/*const updateCase = async (id: string, data: Case) => {
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
}*/

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

/*const getCaseById = async (id: string) => {
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
}*/


/////// CODIGO MOMENTANEO  ELIMINAR  /////
const tokeen = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZGU2ZjI2YjQwMDcyMTUzZDQyNzk1YyIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzI2MTA5NzYwLCJleHAiOjE3MjYxMTA2NjB9.-n1DXLKMfLyEVr_1AtynUA9t5MzHVDy8y9VNiyEaRyY'

const updateCase = async (id: string, data: Case) => {
  try {
 //   const response = await lawCaseApi.put(`/cases/${id}`, data)
    const response = await axios.put(`https://s17-09-n-node-react.onrender.com/api/v1/cases/${id}`, data, {
      headers: {
        Authorization: `Bearer ${tokeen}`,
      },
    });
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
  try {
    const response = await axios.get(`https://s17-09-n-node-react.onrender.com/api/v1/cases/${id}`, {
      headers: {
        Authorization: `Bearer ${tokeen}`,
      },
    });
    return {
      status: response.status,
      data: response.data,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        status: error.response?.status || 500,
        message: error.response?.data?.message || 'Error inesperado en el servidor.',
      };
    }
    return {
      status: 500,
      message: 'Error en el servidor.',
    };
  }
}

const createCase = async (data: Case) => {
  try {
    const response = await axios.post(`https://s17-09-n-node-react.onrender.com/api/v1/cases`, data,{
      headers: {
        Authorization: `Bearer ${tokeen}`,
      },
    });
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
/////////

export default {
  createCase,
  getCasesList,
  getCasesListByUserId,
  updateCase,
  deleteCase,
  getCaseById
}
