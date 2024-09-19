import { Validators } from '../../config/validators'

export class DocumentDTO {
  id: string;
  title: string;
  createdAt: Date;
  caseIds: string[];

  constructor(id: string, title: string, createdAt: Date, caseIds: string[]) {
    if (!Validators.isValidObjectId(id)) {
      throw new Error('Invalid Document ID');
    }
    if (!Validators.isNonEmptyString(title)) {
      throw new Error('Title must be a non-empty string');
    }
    if (!Validators.isValidISODate(createdAt.toISOString())) {
      throw new Error('Invalid creation date');
    }
    if (!Array.isArray(caseIds) || !caseIds.every(Validators.isValidObjectId)) {
      throw new Error('Invalid case IDs');
    }

    this.id = id;
    this.title = title;
    this.createdAt = createdAt;
    this.caseIds = caseIds;
  }
}

// DTO para Case (para incluir en DocumentDTO)
export class CaseDTO {
  id: string;
  caseName: string;
  jury: string;
  caseNumber: string;
  applicant: string;
  respondent: string;
  type: CaseType;
  status: CaseStatus;
  userId: string;
  documentId?: string;

  constructor(
    id: string,
    caseName: string,
    jury: string,
    caseNumber: string,
    applicant: string,
    respondent: string,
    type: CaseType,
    status: CaseStatus,
    userId: string,
    documentId?: string
  ) {
    if (!Validators.isValidObjectId(id)) {
      throw new Error('Invalid Case ID');
    }
    if (!Validators.isNonEmptyString(caseName)) {
      throw new Error('Case name must be a non-empty string');
    }
    if (!Validators.isNonEmptyString(jury)) {
      throw new Error('Jury must be a non-empty string');
    }
    if (!Validators.isNonEmptyString(caseNumber)) {
      throw new Error('Case number must be a non-empty string');
    }
    if (!Validators.isNonEmptyString(applicant)) {
      throw new Error('Applicant must be a non-empty string');
    }
    if (!Validators.isNonEmptyString(respondent)) {
      throw new Error('Respondent must be a non-empty string');
    }
    if (!Validators.enums(type, CaseType)) {
      throw new Error('Invalid case type');
    }
    if (!Validators.enums(status, CaseStatus)) {
      throw new Error('Invalid case status');
    }
    if (!Validators.isValidObjectId(userId)) {
      throw new Error('Invalid User ID');
    }
    if (documentId && !Validators.isValidObjectId(documentId)) {
      throw new Error('Invalid Document ID');
    }

    this.id = id;
    this.caseName = caseName;
    this.jury = jury;
    this.caseNumber = caseNumber;
    this.applicant = applicant;
    this.respondent = respondent;
    this.type = type;
    this.status = status;
    this.userId = userId;
    this.documentId = documentId;
  }
}

// Enums para CaseType y CaseStatus
export enum CaseType {
  SUCCESSION = "SUCCESSION",
  EXECUTION = "EXECUTION",
  TERMINATION = "TERMINATION",
  DAMAGES_AND_LOSSES = "DAMAGES_AND_LOSSES",
  CONTRACT_DISPUTE = "CONTRACT_DISPUTE",
  FAMILY_LAW = "FAMILY_LAW",
  CRIMINAL = "CRIMINAL",
  PROPERTY_DISPUTE = "PROPERTY_DISPUTE",
  PERSONAL_INJURY = "PERSONAL_INJURY",
  INTELLECTUAL_PROPERTY = "INTELLECTUAL_PROPERTY",
}

export enum CaseStatus {
  INITIATED = "INITIATED",
  EVIDENCE = "EVIDENCE",
  JUDGMENT = "JUDGMENT",
  CLOSED = "CLOSED",
}
