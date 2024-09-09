export interface ISession {
  loading: boolean
  user: ISessionUser | null
  status: TSessionStatus
}

export interface ISessionUser {
  id: string
  name: string
  lastName: string
  email: string
  role: TSessionUserRole
  profilePic?: string
}


export type TSessionStatus = 'valid' | 'expired' | 'checking'

export type TSessionUserRole = 'ADMIN' | 'USER'
