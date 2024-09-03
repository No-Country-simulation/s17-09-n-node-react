import { MovementType } from '@prisma/client'

interface IUpdateMovement {
  date?: Date
  title?: string
  type?: MovementType
  content?: string
  done?: boolean
}

export class UpdateMovementDTO {
  constructor(
    public date?: Date,
    public title?: string,
    public type?: MovementType,
    public content?: string,
    public done?: boolean,
  ) {}

  static create(object: IUpdateMovement) {
    const { date, title, type, content, done } = object
    const instance = new UpdateMovementDTO(date, title, type, content, done)
    const errors: string[] = []

    const hasAtLeastOneProperty = Object.values(object).some((value) => value !== undefined)

    if (!hasAtLeastOneProperty) {
      errors.push('At least one property must be provided')
    }

    if (date !== undefined && !(date instanceof Date)) {
      errors.push(`'date' should be a Date object`)
    }
    if (title !== undefined && typeof title !== 'string') {
      errors.push(`'title' should be a string`)
    }
    if (type !== undefined && !Object.values(MovementType).includes(type)) {
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
