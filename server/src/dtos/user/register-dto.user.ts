import { Validators } from '../../config/validators'
import { ROLE } from '../../enums/enum'

interface IRegisterUserDTO {
  email: string
  name: string
  lastName: string
  password: string
  role: ROLE
}

export class RegisterUserDTO {
  constructor(
    public email: string,
    public name: string,
    public lastName: string,
    public password: string,
    public role: ROLE,
  ) {}

  static create(object: IRegisterUserDTO): [string?, RegisterUserDTO?] {
    const { email, name, lastName, password, role } = object

    if (!email) return ['Missing email']
    if (!name) return ['Missing name']
    if (!lastName) return ['Missing last name']
    if (!Validators.email.test(email)) return ['Email is not valid']
    if (!password) return ['Missing password']
    if (password.length < 6) return ['Password too short']
    if (role && !Object.values(ROLE).includes(role)) return ['Role not valid']

    return [
      undefined,
      new RegisterUserDTO(email, name, lastName, password, role),
    ]
  }
}
