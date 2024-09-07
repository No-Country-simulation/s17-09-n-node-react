import { Validators } from '../../config/validators'

export class UpdateUserDTO {
  constructor(
    public name: string,
    public lastName: string,
    public imageUrl: string,
  ) {}

  static create(object: { [key: string]: string }): [string[]?, UpdateUserDTO?] {
    const { name, lastName, imageUrl } = object
    const instance = new UpdateUserDTO(name, lastName, imageUrl)
    let errors = []

    const hasAtLeastOneProperty = Object.values(object).some((value) => value !== undefined)

    if (!hasAtLeastOneProperty) errors.push('At least one property must be provided')

    if (name !== undefined && !Validators.names.test(name)) errors.push('name is not valid')
    if (lastName !== undefined && !Validators.names.test(lastName)) errors.push('name is not valid')

    return [undefined, instance]
  }
}
