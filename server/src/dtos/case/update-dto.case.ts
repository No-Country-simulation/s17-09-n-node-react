import { CaseStatus, CaseType } from "@prisma/client";

export class UpdateCaseDTO {
    caseName?: string;
    jury?: string;
    caseNumber?: string;
    applicant?: string;
    respondent?: string;
    type?: CaseType;
    status?: CaseStatus;
  }
