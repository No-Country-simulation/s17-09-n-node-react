import { IUser } from '.'

export interface IAuth {
  token: string | null
  user: IUser | null
  status: TAuthStatus
  errorMessage: string | null
  
  
}

export type TAuthStatus = 'loading' | 'authenticated' | 'not-authenticated'

export interface ILoginData {
  email: string
  password: string
}

export interface IRegisterData {
  name: string
  email: string
  lastName: string
  password: string
}
