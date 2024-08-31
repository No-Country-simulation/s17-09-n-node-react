import { Validators } from '../../config/validators'

export class RegisterUserDTO {
  constructor(
    public email: string,
    public name: string,
    public lastName: string,
    public password: string,
  ) {}

  static create(object: {
    [key: string]: string
  }): [string[]?, RegisterUserDTO?] {
    const { email, name, lastName, password } = object
    const keys = ['email', 'name', 'lastName', 'password']

    if (
      Object.values(object).length > RegisterUserDTO.length ||
      !keys.every((key) => Object.keys(object).includes(key)) ||
      !Validators.email.test(email) ||
      password.length < 6
    ) {
      // eslint-disable-next-line prefer-const
      let errors = []
      if (!keys.every((key) => Object.keys(object).includes(key))) {
        if (!email) errors.push(`Missing 'email'`)
        if (!name) errors.push(`Missing 'name'`)
        if (!lastName) errors.push(`Missing 'lastName'`)
        if (!password) errors.push(`Missing 'password'`)
        Object.keys(object)
          .filter(
            (key) =>
              key !== 'email' &&
              key !== 'name' &&
              key !== 'lastName' &&
              key !== 'password',
          )
          .forEach((key) => errors.push(`'${key}' should not exist`))
      } else {
        if (Object.values(object).length > RegisterUserDTO.length)
          Object.keys(object)
            .filter(
              (key) =>
                key !== 'email' &&
                key !== 'name' &&
                key !== 'lastName' &&
                key !== 'password',
            )
            .forEach((key) => errors.push(`'${key}' should not exist`))
        if (!Validators.email.test(email)) errors.push('Email is not valid')
        if (password.length < 6) errors.push('Password too short')
      }
      return [errors]
    }

    return [undefined, new RegisterUserDTO(email, name, lastName, password)]
  }
}
