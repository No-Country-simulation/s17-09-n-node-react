/* eslint-disable @typescript-eslint/no-unused-vars */
import { useReducer, useEffect, useCallback } from 'react'

import { AxiosError } from 'axios'

import { AuthContext } from './AuthContext'
import { authReducer } from './authReducer'

import { lawCaseApi } from '../../apis'
import type {
  IAuth,
  IUser,
  ILoginData,
  IRegisterData,
  StatusRespMsg,
} from '../../interfaces'

interface IAuthProviderProps {
  children: React.ReactNode
}

const initialState: IAuth = {
  token: null,
  user: null,
  status: 'loading',
  errorMessage: null,
}

export const AuthProvider = ({ children }: IAuthProviderProps) => {
  const [state, dispatch] = useReducer(authReducer, initialState)

  const getUser = async (token: string): Promise<IUser> => {
    try {
      const { data: user } = await lawCaseApi.get<IUser>('/user', {
        headers: { Authorization: `Bearer ${token}` },
      })

      return user
    } catch (error) {
      throw new Error('No se pudo obtener el perfil del usuario.')
    }
  }

  const startLogin = async (credentials: ILoginData) => {
    dispatch({ type: 'clearErrorMessage' })

    try {
      const { data } = await lawCaseApi.post('/user/login', { ...credentials })

      if (!data) {
        dispatch({
          type: 'logout',
          payload: 'Ocurrió un error. Por favor intente más tarde.',
        })
        return
      }

      const user = await getUser(data.accessToken)

      dispatch({ type: 'login', payload: { token: data.accessToken, user } })
    } catch (error) {
      if (error instanceof AxiosError) {
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 404)
        ) {
          dispatch({ type: 'logout', payload: 'Credenciales Inválidas' })
        } else {
          dispatch({ type: 'logout', payload: 'Error en el servidor.' })
        }
      } else if (error instanceof Error) {
        dispatch({ type: 'logout', payload: 'Error: ' + error.message })
      } else {
        dispatch({ type: 'logout', payload: 'Error desconocido:' + error })
      }
    }
  }

  const startRegister = async (
    credentials: IRegisterData,
  ): Promise<StatusRespMsg> => {
    dispatch({ type: 'clearErrorMessage' })

    try {
      const response = await lawCaseApi.post('/user/register', {
        ...credentials,
      })

      if (response.status !== 201) {
        return {
          ok: false,
          msg: 'Ocurrió un error. Por favor intente más tarde.',
        }
      }

      return {
        ok: true,
        msg: 'Registro exitoso. Por favor, inicia sesión.',
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response && error.response.status === 409) {
          return {
            ok: false,
            msg: 'El email ya está registrado.',
          }
        } else {
          return {
            ok: false,
            msg: 'Error inesperado en el servidor.',
          }
        }
      } else if (error instanceof Error) {
        return {
          ok: false,
          msg: 'Error: ' + error.message,
        }
      } else {
        return {
          ok: false,
          msg: 'Error desconocido: ' + error,
        }
      }
    }
  }

  const startLogout = async () => {
    dispatch({ type: 'setLoading' })

    try {
      await lawCaseApi.get('/user/logout')
      dispatch({ type: 'logout', payload: null })
    } catch (error) {
      dispatch({ type: 'logout', payload: null })
    }
  }

  const startRefreshToken = useCallback(async (): Promise<
    string | undefined
  > => {
    dispatch({ type: 'setLoading' })

    try {
      const { data } = await lawCaseApi.get('/user/refresh')

      const user = await getUser(data.accessToken)

      dispatch({ type: 'login', payload: { token: data.accessToken, user } })

      return data.accessToken as string
    } catch (error) {
      dispatch({ type: 'logout', payload: null })
    }
  }, [])

  const setUser = (user: IUser) => {
    dispatch({ type: 'setUser', payload: user })
  }

  useEffect(() => {
    const requestInterceptor = lawCaseApi.interceptors.request.use((config) => {
      config.headers.Authorization =
        !(config as any)._retry && state.token
          ? `Bearer ${state.token}`
          : config.headers.Authorization
      return config
    })

    return () => {
      lawCaseApi.interceptors.request.eject(requestInterceptor)
    }
  }, [state.token])

  useEffect(() => {
    const responseInterceptor = lawCaseApi.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config

        if (
          error?.response?.status === 403 &&
          error?.response?.data?.error?.description === 'jwt expired' &&
          !prevRequest?._retry
        ) {
          try {
            const token = await startRefreshToken()

            if (!token) throw new Error('Token could not be obtained')

            prevRequest.headers.Authorization = `Bearer ${token}`
            prevRequest._retry = true

            return lawCaseApi(prevRequest)
          } catch (error) {
            dispatch({
              type: 'logout',
              payload:
                'Su sesión ha expirado. Por favor, vuelva a iniciar sesión.',
            })
          }
        }

        return Promise.reject(error)
      },
    )

    return () => {
      lawCaseApi.interceptors.response.eject(responseInterceptor)
    }
  }, [startRefreshToken])

  return (
    <AuthContext.Provider
      value={{
        ...state,
        setUser,
        startLogin,
        startLogout,
        startRegister,
        startRefreshToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
