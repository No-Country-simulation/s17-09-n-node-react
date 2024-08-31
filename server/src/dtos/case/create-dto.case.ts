import { CaseStatus, CaseType } from '@prisma/client'

export class CreateCaseDTO {
  constructor(
    public caseName: string,
    public jury: string,
    public caseNumber: string,
    public applicant: string,
    public respondent: string,
    public userId: string,
    public type: CaseType,
    public status?: CaseStatus,
  ) {}

  static create(object: { [key: string]: string }): [string[]?, CreateCaseDTO?] {
    const { caseName, jury, caseNumber, applicant, respondent, userId, type, status } = object
    const instance = new CreateCaseDTO(
      caseName,
      jury,
      caseNumber,
      applicant,
      userId,
      respondent,
      type as CaseType,
      status as CaseStatus,
    )
    const keys = Object.keys(instance)

    if (
      Object.keys(object).length > CreateCaseDTO.length ||
      !keys.every((key) => Object.keys(object).includes(key))
    ) {
      let errors = []
      if (!keys.every((key) => Object.keys(object).includes(key))) {
        if (!caseName) errors.push(`'caseName' is missing`)
        if (!jury) errors.push(`'jury' is missing`)
        if (!caseNumber) errors.push(`'caseNumber' is missing`)
        if (!applicant) errors.push(`'applicant' is missing`)
        if (!userId) errors.push(`'userId' is missing`)
        if (!respondent) errors.push(`'respondent' is missing`)
        if (!type) errors.push(`'type' is missing`)
        if (!status) errors.push(`'status' is missing`)
        Object.keys(object)
          .filter((key) => !keys.includes(key))
          .forEach((key) => errors.push(`'${key}' should not exist`))
      } else {
        if (Object.values(object).length > CreateCaseDTO.length) {
          Object.keys(object)
            .filter((key) => !keys.includes(key))
            .forEach((key) => errors.push(`'${key}' should not exist`))
        }
      }
      return [errors]
    }

    return [undefined, instance]
  }
}
