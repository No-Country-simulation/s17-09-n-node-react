import { ContactRelation } from '@prisma/client'
import { Validators } from '../../config/validators'

export class CreateContactDTO {
  constructor(
    public name: string,
    public lastName: string,
    public phone: string,
    public email: string,
    public address: string,
    public relation: ContactRelation,
    public caseId: string,
  ) {}

  static create(object: { [key: string]: string }): [string[]?, CreateContactDTO?] {
    const { name, lastName, phone, email, address, relation, caseId } = object
    const instance = new CreateContactDTO(
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

  private static validate(object: { [key: string]: string }, instance: CreateContactDTO): string[] {
    const keys = Object.keys(instance)
    const errors: string[] = []

    if (!keys.every((key) => Object.keys(object).includes(key))) {
      this.checkMissingFields(object, keys, errors)
    } else {
      this.checkFieldTypes(object, errors)
      this.checkEnumValues(object, errors)
      this.checkExtraFields(object, keys, errors)
      this.checkEmptyString(object, errors)
      this.checkValidEmail(object, errors)
      this.checkValidName(object, errors)
      this.checkValidLastName(object, errors)
    }

    return errors
  }

  private static checkMissingFields(
    object: { [key: string]: string },
    keys: string[],
    errors: string[],
  ) {
    if (!object.name) errors.push(`'name' is missing`)
    if (!object.lastName) errors.push(`'lastName' is missing`)
    if (!object.phone) errors.push(`'phone' is missing`)
    if (!object.email) errors.push(`'email' is missing`)
    if (!object.address) errors.push(`'address' is missing`)
    if (!object.relation) errors.push(`'relation' is missing`)
    if (!object.caseId) errors.push(`'caseId' is missing`)
  }

  private static checkFieldTypes(object: { [key: string]: string }, errors: string[]) {
    if (!Validators.isString(object.name)) errors.push('name should be a string')
    if (!Validators.isString(object.lastName)) errors.push('lastName should be a string')
    if (!Validators.isString(object.phone)) errors.push('phone should be a string')
    if (!Validators.isString(object.email)) errors.push('email should be a string')
    if (!Validators.isString(object.address)) errors.push('address should be a string')
    if (!Validators.isString(object.caseId)) errors.push('caseId should be a string')
  }

  private static checkEnumValues(object: { [key: string]: string }, errors: string[]) {
    if (!Validators.enums(object.relation, ContactRelation)) errors.push('relation is not valid')
  }

  private static checkExtraFields(
    object: { [key: string]: string },
    keys: string[],
    errors: string[],
  ) {
    if (Object.values(object).length > CreateContactDTO.length) {
      Object.keys(object)
        .filter((key) => !keys.includes(key))
        .forEach((key) => errors.push(`'${key}' should not exist`))
    }
  }

  private static checkEmptyString(object: { [key: string]: string }, errors: string[]) {
    if (object.name.trim() === '') errors.push('name should not be an empty string')
    if (object.lastName.trim() === '') errors.push('lastName should not be an empty string')
    if (object.phone.trim() === '') errors.push('phone should not be an empty string')
    if (object.email.trim() === '') errors.push('email should not be an empty string')
    if (object.address.trim() === '') errors.push('address should not be an empty string')
    if (object.caseId.trim() === '') errors.push('caseId should not be an empty string')
  }

  private static checkValidEmail(object: { [key: string]: string }, errors: string[]) {
    if (!Validators.email.test(object.email)) errors.push('email is not valid')
  }

  private static checkValidName(object: { [key: string]: string }, errors: string[]) {
    if (!Validators.names.test(object.name)) errors.push('name is not valid')
  }

  private static checkValidLastName(object: { [key: string]: string }, errors: string[]) {
    if (!Validators.names.test(object.lastName)) errors.push('lastName is not valid')
  }
}
