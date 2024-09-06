import { createContext } from 'react'

import type { ISession, ISessionUser } from '../../interfaces'

interface ISessionContext extends ISession {
  createSession: (user: ISessionUser) => void
  deleteSession: () => void
  loadingSession: () => void
}

export const SessionContext = createContext<ISessionContext | null>(null)
