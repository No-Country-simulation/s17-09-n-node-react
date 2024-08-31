import { CaseStatus, CaseType } from "@prisma/client";

export class CreateCaseDTO {
    caseName: string;
    jury: string;
    caseNumber: string;
    applicant: string;
    respondent: string;
    type: CaseType;
    status?: CaseStatus;
    userId: string;
  }
