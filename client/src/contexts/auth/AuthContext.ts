import { createContext } from 'react'

import type {
  IAuth,
  IUser,
  ILoginData,
  IRegisterData,
  StatusRespMsg,
} from '../../interfaces'

interface IAuthContext extends IAuth {
  startLogin: (data: ILoginData) => Promise<void>
  startRegister: (data: IRegisterData) => Promise<StatusRespMsg>
  startLogout: () => Promise<void>
  startRefreshToken: () => Promise<string | undefined>
  setUser: (user: IUser) => void
  changePassword: (currentPassword: string, newPassword: string) => Promise<any>;
}

export const AuthContext = createContext<IAuthContext | null>(null)
