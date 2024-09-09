import { useReducer } from 'react'

import { SessionContext } from './SessionContext'
import { sessionReducer } from './sessionReducer'

import { ISession, ISessionUser } from '../../interfaces'

interface ISessionProviderProps {
  children: React.ReactNode
}

const initialState: ISession = {
  loading: false,
  user: null,
  status: 'checking',
}

export const SessionProvider = ({ children }: ISessionProviderProps) => {
  const [state, dispath] = useReducer(sessionReducer, initialState)

  const createSession = (user: ISessionUser) => {
    dispath({ type: 'setSession', payload: user })
  }

  const deleteSession = () => {
    dispath({ type: 'removeSession' })
  }

  const loadingSession = () => {
    dispath({ type: 'setLoadingSession' })
  }

  return (
    <SessionContext.Provider
      value={{
        ...state,
        createSession,
        deleteSession,
        loadingSession,
      }}
    >
      {children}
    </SessionContext.Provider>
  )
}
