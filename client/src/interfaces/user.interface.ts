export interface IUser {
  name: string
  lastName: string
  email: string
  imageUrl: string
  role: TUserRole
}

export type TUserRole = 'ADMIN' | 'USER'
