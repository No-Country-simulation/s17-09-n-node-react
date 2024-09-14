import { MovementType } from '@prisma/client'
import { Validators } from '../../config/validators'

interface IMovement {
  date: string
  title: string
  type: MovementType
  content: string
  caseId: string
}

export class CreateMovementDTO {
  constructor(
    public date: string,
    public title: string,
    public type: MovementType,
    public content: string,
    public caseId: string,
  ) {}

  static create(object: IMovement): [string[]?, CreateMovementDTO?] {
    const { date, title, type, content, caseId } = object
    const instance = new CreateMovementDTO(date, title, type, content, caseId)
    const keys = Object.keys(instance)
    let errors: string[] = []

    keys.forEach((key) => {
      if (!(key in object)) errors.push(`Missing ${key}`)
    })

    Object.keys(object).forEach((key) => {
      if (!keys.includes(key)) errors.push(`'${key}' should not exist`)
    })

    if (!Validators.isValidISODate(date)) {
      errors.push(`'date' should be a valid ISO 8601 date string`)
    }

    if (typeof title !== 'string') {
      errors.push(`'title' should be a string`)
    }
    if (!Validators.enums(type, MovementType)) {
      errors.push(`'type' should be ${Object.values(MovementType).join(', ')}`)
    }
    if (typeof content !== 'string') {
      errors.push(`'content' should be a string`)
    }
    if (typeof caseId !== 'string') {
      errors.push(`'caseId' should be a string`)
    }

    if (errors.length > 0) return [errors]

    return [undefined, instance]
  }
}
