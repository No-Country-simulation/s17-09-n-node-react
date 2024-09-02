export class UpdatePasswordDTO {
  constructor(
    public currentPassword: string,
    public newPassword: string,
  ) {}

  static create(object: { [key: string]: string }): [string[]?, UpdatePasswordDTO?] {
    const { currentPassword, newPassword } = object
    const instance = new UpdatePasswordDTO(currentPassword, newPassword)
    const keys = Object.keys(instance)

    if (
      Object.values(object).length > UpdatePasswordDTO.length ||
      !keys.every((key) => Object.keys(object).includes(key))
    ) {
      let errors = []
      if (!keys.every((key) => Object.keys(object).includes(key))) {
        if (!currentPassword) errors.push(`Missing 'currentPassword'`)
        if (!newPassword) errors.push(`Missing 'newPassword'`)
        Object.keys(object)
          .filter((key) => !keys.includes(key))
          .forEach((key) => errors.push(`'${key}' should not exist`))
      } else {
        if (Object.values(object).length > UpdatePasswordDTO.length)
          Object.keys(object)
            .filter((key) => !keys.includes(key))
            .forEach((key) => errors.push(`'${key}' should not exist`))
      }
      return [errors]
    }

    return [undefined, instance]
  }
}
