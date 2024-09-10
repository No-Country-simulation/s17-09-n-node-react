import { MovementType } from '@prisma/client'
import { Validators } from '../../config/validators'

interface IUpdateMovement {
  date?: string
  title?: string
  type?: MovementType
  content?: string
  done?: boolean
}

export class UpdateMovementDTO {
  constructor(
    public date?: string,
    public title?: string,
    public type?: MovementType,
    public content?: string,
    public done?: boolean,
  ) {}

  static create(object: IUpdateMovement): [string[]?, UpdateMovementDTO?] {
    const { date, title, type, content, done } = object
    const instance = new UpdateMovementDTO(date, title, type, content, done)
    const errors: string[] = []

    const hasAtLeastOneProperty = Object.values(object).some((value) => value !== undefined)

    if (!hasAtLeastOneProperty) {
      errors.push('At least one property must be provided')
    }

    if (date !== undefined && !Validators.isValidISODate(date)) {
      errors.push(`'date' should be a valid ISO 8601 date string`)
    }
    if (title !== undefined && typeof title !== 'string') {
      errors.push(`'title' should be a string`)
    }
    if (type !== undefined && !Validators.enums(type, MovementType)) {
      errors.push(`'type' should be a valid MovementType`)
    }
    if (content !== undefined && typeof content !== 'string') {
      errors.push(`'content' should be a string`)
    }
    if (done !== undefined && typeof done !== 'boolean') {
      errors.push(`'done' should be a string`)
    }

    if (errors.length > 0) {
      return [errors]
    }

    return [undefined, instance]
  }
}
