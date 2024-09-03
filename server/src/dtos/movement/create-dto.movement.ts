import { MovementType } from '@prisma/client'
import { Validators } from '../../config/validators'

interface IMovement {
  date: Date
  title: string
  type: MovementType
  content: string
  caseId: string
}

export class CreateMovementDTO {
  constructor(
    public date: Date,
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

    if (!(date instanceof Date)) {
      errors.push(`'date' should be a Date object`)
    }
    if (typeof title !== 'string') {
      errors.push(`'title' should be a string`)
    }
    if (!Validators.enums(MovementType, type)) {
      errors.push(`'type' should be a valid MovementType`)
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
