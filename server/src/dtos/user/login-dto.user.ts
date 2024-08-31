import { Validators } from '../../config/validators'

export class LoginUserDTO {
  constructor(
    public email: string,
    public password: string,
  ) {}

  static create(object: { [key: string]: string }): [string[]?, LoginUserDTO?] {
    const { email, password } = object
    const instance = new LoginUserDTO(email, password)
    const keys = Object.keys(instance)

    if (
      Object.values(object).length > LoginUserDTO.length ||
      !keys.every((key) => Object.keys(object).includes(key)) ||
      !Validators.email.test(email)
    ) {
      let errors = []
      if (!keys.every((key) => Object.keys(object).includes(key))) {
        if (!email) errors.push(`Missing 'email'`)
        if (!password) errors.push(`Missing 'password'`)
        Object.keys(object)
          .filter((key) => !keys.includes(key))
          .forEach((key) => errors.push(`'${key}' should not exist`))
      } else {
        if (Object.values(object).length > LoginUserDTO.length)
          Object.keys(object)
            .filter((key) => !keys.includes(key))
            .forEach((key) => errors.push(`'${key}' should not exist`))
        if (!Validators.email.test(email)) errors.push(`'email' provided is not valid`)
      }
      return [errors]
    }

    return [undefined, instance]
  }
}
