import { ContactRelation } from '@prisma/client'
import { Validators } from '../../config/validators'

export class UpdateContactDTO {
  constructor(
    public name?: string,
    public lastName?: string,
    public phone?: string,
    public email?: string,
    public address?: string,
    public relation?: ContactRelation,
    public caseId?: string,
  ) {}

  static update(object: { [key: string]: string }): [string[]?, UpdateContactDTO?] {
    const { name, lastName, phone, email, address, relation, caseId } = object
    const instance = new UpdateContactDTO(
      name,
      lastName,
      phone,
      email,
      address,
      relation as ContactRelation,
      caseId,
    )

    const errors = this.validate(object, instance)
    if (errors.length > 0) {
      return [errors]
    }

    return [undefined, instance]
  }

  private static validate(object: { [key: string]: string }, instance: UpdateContactDTO): string[] {
    const keys = Object.keys(instance)
    const errors: string[] = []

    this.checkFieldTypes(object, errors)
    this.checkEnumValues(object, errors)
    this.checkExtraFields(object, keys, errors)
    this.checkEmptyString(object, errors)
    this.checkValidEmail(object, errors)
    this.checkValidName(object, errors)
    this.checkValidLastName(object, errors)

    return errors
  }

  private static checkFieldTypes(object: { [key: string]: string }, errors: string[]) {
    if (object.name && !Validators.isString(object.name)) errors.push('name should be a string')
    if (object.lastName && !Validators.isString(object.lastName))
      errors.push('lastName should be a string')
    if (object.phone && !Validators.isString(object.phone)) errors.push('phone should be a string')
    if (object.email && !Validators.isString(object.email)) errors.push('email should be a string')
    if (object.address && !Validators.isString(object.address))
      errors.push('address should be a string')
    if (object.caseId && !Validators.isString(object.caseId))
      errors.push('caseId should be a string')
  }

  private static checkEnumValues(object: { [key: string]: string }, errors: string[]) {
    if (object.relation && !Validators.enums(object.relation, ContactRelation))
      errors.push('relation is not valid')
  }

  private static checkExtraFields(
    object: { [key: string]: string },
    keys: string[],
    errors: string[],
  ) {
    if (Object.values(object).length > UpdateContactDTO.length) {
      Object.keys(object)
        .filter((key) => !keys.includes(key))
        .forEach((key) => errors.push(`'${key}' should not exist`))
    }
  }

  private static checkEmptyString(object: { [key: string]: string }, errors: string[]) {
    if (object.name && object.name.trim() === '') errors.push('name should not be an empty string')
    if (object.lastName && object.lastName.trim() === '')
      errors.push('lastName should not be an empty string')
    if (object.phone && object.phone.trim() === '')
      errors.push('phone should not be an empty string')
    if (object.email && object.email.trim() === '')
      errors.push('email should not be an empty string')
    if (object.address && object.address.trim() === '')
      errors.push('address should not be an empty string')
    if (object.caseId && object.caseId.trim() === '')
      errors.push('caseId should not be an empty string')
  }

  private static checkValidEmail(object: { [key: string]: string }, errors: string[]) {
    if (object.email && !Validators.email.test(object.email)) errors.push('email is not valid')
  }

  private static checkValidName(object: { [key: string]: string }, errors: string[]) {
    if (object.name && !Validators.names.test(object.name)) errors.push('name is not valid')
  }

  private static checkValidLastName(object: { [key: string]: string }, errors: string[]) {
    if (object.lastName && !Validators.names.test(object.lastName))
      errors.push('lastName is not valid')
  }
}
