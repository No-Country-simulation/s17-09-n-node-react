import axios, { type AxiosRequestHeaders } from 'axios'

const lawCaseApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

lawCaseApi.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    Authorization: localStorage.getItem('token'),
  } as AxiosRequestHeaders

  return config
})

export default lawCaseApi
