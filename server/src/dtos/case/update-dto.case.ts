import { CaseStatus, CaseType } from '@prisma/client'

export class UpdateCaseDTO {
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

  static create(object: { [key: string]: string }): [string[]?, UpdateCaseDTO?] {
    const { caseName, jury, caseNumber, applicant, respondent, userId, type, status } = object
    const instance = new UpdateCaseDTO(
      caseName,
      jury,
      caseNumber,
      applicant,
      respondent,
      userId,
      type as CaseType,
      status as CaseStatus,
    )
    const keys = Object.keys(instance)

    if (
      Object.keys(object).length > UpdateCaseDTO.length ||
      !keys.every((key) => Object.keys(object).includes(key))
    ) {
      let errors = []
      if (!keys.every((key) => Object.keys(object).includes(key))) {
        Object.keys(object)
          .filter((key) => !keys.includes(key))
          .forEach((key) => errors.push(`'${key}' should not exist`))
      }
    }

    return [undefined, instance]
  }
}
