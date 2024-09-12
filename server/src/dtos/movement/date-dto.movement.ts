import { Validators } from '../../config/validators'

export class DateMovementDTO {
  constructor(public date?: string) {}

  static create(object: { date?: string }): [string[]?, DateMovementDTO?] {
    const { date } = object
    const instance = new DateMovementDTO(date)
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
