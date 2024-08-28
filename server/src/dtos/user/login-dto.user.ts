import { Validators } from '../../config/validators'

export class LoginUserDTO {
  constructor(
    public email: string,
    public password: string,
  ) {}

  static create(object: { [key: string]: string }): [string?, LoginUserDTO?] {
    const { email, password } = object

    if (!email) return ['Missing email']
    if (!Validators.email.test(email)) return ['Email is not valid']
    if (!password) return ['Missing password']

    return [undefined, new LoginUserDTO(email, password)]
  }
}
