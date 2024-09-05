import axios from 'axios';

const API_URL = 'https://s17-09-n-node-react.onrender.com/api/v1/user/register';

export const registerUser = async (data: {
  email: string;
  name: string;
  lastName: string;
  password: string;
}) => {
  try {
    const response = await axios.post(API_URL, data);
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
};
