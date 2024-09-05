import { Validators } from '../../config/validators'

export class RegisterUserDTO {
  constructor(
    public email: string,
    public name: string,
    public lastName: string,
    public password: string,
  ) {}

  static create(object: { [key: string]: string }): [string[]?, RegisterUserDTO?] {
    const { email, name, lastName, password } = object
    const instance = new RegisterUserDTO(email, name, lastName, password)
    const keys = Object.keys(instance)

    if (
      Object.values(object).length > keys.length ||
      !keys.every((key) => Object.keys(object).includes(key)) ||
      !Validators.email.test(email) ||
      !Validators.names.test(name) ||
      typeof name === 'boolean' ||
      !Validators.names.test(lastName) ||
      typeof lastName === 'boolean' ||
      password.length < 6
    ) {
      let errors = []
      if (!keys.every((key) => Object.keys(object).includes(key))) {
        if (!email) errors.push(`Missing 'email'`)
        if (!name) errors.push(`Missing 'name'`)
        if (!lastName) errors.push(`Missing 'lastName'`)
        if (!password) errors.push(`Missing 'password'`)
        if (password?.length < 6) errors.push('Password too short')
        if (email && !Validators.email.test(email)) errors.push('Email is not valid')
        if (!Validators.names.test(name)) errors.push('name should be a string')
        if (!Validators.names.test(lastName)) errors.push('lastName should be a string')
        Object.keys(object)
          .filter((key) => !keys.includes(key))
          .forEach((key) => errors.push(`'${key}' should not exist`))
      } else {
        if (Object.values(object).length > RegisterUserDTO.length)
          Object.keys(object)
            .filter((key) => !keys.includes(key))
            .forEach((key) => errors.push(`'${key}' should not exist`))
        if (!Validators.email.test(email)) errors.push('Email is not valid')
        if (password.length < 6) errors.push('Password too short')
        if (!Validators.names.test(name) || typeof name === 'boolean')
          errors.push('name should be a string')
        if (!Validators.names.test(lastName) || typeof lastName === 'boolean')
          errors.push('lastName should be a string')
      }
      return [errors]
    }

    return [undefined, instance]
  }
}
