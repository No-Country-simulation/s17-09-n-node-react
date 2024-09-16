import { CaseStatus, CaseType } from '@prisma/client'

export interface Case {
  id: string
  createdAt: Date
  caseName: string
  jury: string
  caseNumber: string
  applicant: string
  respondent: string
  type: CaseType
  status: CaseStatus
}

export class CaseDTO {
  constructor(
    public id: string,
    public createdAt: Date,
    public caseName: string,
    public jury: string,
    public caseNumber: string,
    public applicant: string,
    public respondent: string,
    public type: CaseType,
    public status: CaseStatus,
  ) {}

  static create(object: Case): CaseDTO {
    const { id, createdAt, caseName, jury, caseNumber, applicant, respondent, type, status } =
      object

    return new CaseDTO(
      id,
      createdAt,
      caseName,
      jury,
      caseNumber,
      applicant,
      respondent,
      type,
      status,
    )
  }
}
