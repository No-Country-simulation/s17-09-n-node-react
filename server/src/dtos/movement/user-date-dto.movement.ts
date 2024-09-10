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

    if (!userId) {
      errors.push('Must provide userId')
    } else if (!Validators.isValidObjectId(userId)) {
      errors.push(`'userId' is not valid objectId`)
    }

    if (!date) {
      errors.push('Must provide date')
    } else if (!Validators.isValidISODate(date)) {
      errors.push(`'date' should be a valid ISO 8601 date string`)
    }

    if (errors.length > 0) {
      return [errors]
    }

    return [undefined, instance]
  }
}
