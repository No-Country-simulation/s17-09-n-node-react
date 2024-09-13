import { Case } from '../case/case-dto.case'

export interface User {
  email: string
  name: string
  lastName: string
  role: string
  imageUrl: string
  isActive: boolean
  cases: Pick<Case, 'id' | 'caseName'>[] | null
  createdAt: Date
  updatedAt: Date
}

export class UserDTO {
  constructor(
    public email: string,
    public name: string,
    public lastName: string,
    public role: string,
    public imageUrl: string,
    public createdAt: Date,
    public updatedAt: Date,
    public cases: Pick<Case, 'id' | 'caseName'>[] | null,
  ) {}

  static create(object: User): UserDTO {
    const { email, name, lastName, role, imageUrl, createdAt, updatedAt, cases } = object

    return new UserDTO(email, name, lastName, role, imageUrl, createdAt, updatedAt, cases)
  }
}
