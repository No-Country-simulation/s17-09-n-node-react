import { createContext } from 'react'

import type { IAuth, IUser, ILoginData, IRegisterData } from '../../interfaces'

interface IAuthContext extends IAuth {
  startLogin: (data: ILoginData) => Promise<void>
  startRegister: (data: IRegisterData) => Promise<void>
  startLogout: () => Promise<void>
  startRefreshToken: () => Promise<void>
  setUser: (user: IUser) => void
}

export const AuthContext = createContext<IAuthContext | null>(null)
