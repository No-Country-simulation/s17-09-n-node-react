import { Validators } from '../../config/validators'

export class UserDateMovementDTO {
  constructor(
    public userId?: string,
    public date?: string,
  ) {}

  static create(object: { userId?: string; date?: string }): [string[]?, UserDateMovementDTO?] {
    const { userId, date } = object
    const instance = new UserDateMovementDTO(userId, date)
    const errors: string[] = []

    if (!date) {
      errors.push('Must provide date')
    }

    if (date !== undefined && !Validators.isValidISODate(date)) {
      errors.push(`'date' should be a valid ISO 8601 date string`)
    }

    if (errors.length > 0) {
      return [errors]
    }

    return [undefined, instance]
  }
}
