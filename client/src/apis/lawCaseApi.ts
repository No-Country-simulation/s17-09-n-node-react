import axios, { type AxiosRequestHeaders } from 'axios';

// Crear instancia de Axios
const lawCaseApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Interceptor de solicitudes
lawCaseApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    if (token) {
      // Añadir el encabezado de autorización solo si el token está presente
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      } as AxiosRequestHeaders;
    }

    return config;
  },
  (error) => {
    // Manejar errores en la solicitud
    return Promise.reject(error);
  }
);

// Interceptor de respuestas
lawCaseApi.interceptors.response.use(
  (response) => response,
  (error) => {
    // Manejar errores en la respuesta
    // Ejemplo: Redirigir al login si el error es de autenticación (401)
    if (error.response?.status === 401) {
      // Limpiar token y redirigir al login
      localStorage.removeItem('token');
      // Aquí puedes redirigir al usuario a la página de login si usas un enrutador
      // e.g., history.push('/login');
    }

    return Promise.reject(error);
  }
);

export default lawCaseApi;
