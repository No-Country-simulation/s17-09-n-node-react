import { CaseStatus, CaseType } from '@prisma/client';
import { Validators } from '../../config/validators';

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
    const { caseName, jury, caseNumber, applicant, respondent, userId, type, status } = object;
    const instance = new CreateCaseDTO(
      caseName,
      jury,
      caseNumber,
      applicant,
      respondent,
      userId,
      type as CaseType,
      status as CaseStatus,
    );

    const errors = this.validate(object, instance);
    if (errors.length > 0) {
      return [errors];
    }

    return [undefined, instance];
  }

  private static validate(object: { [key: string]: string }, instance: CreateCaseDTO): string[] {
    const keys = Object.keys(instance);
    const errors: string[] = [];

    if (!keys.every((key) => Object.keys(object).includes(key))) {
      this.checkMissingFields(object, keys, errors);
    } else {
      this.checkFieldTypes(object, errors);
      this.checkEnumValues(object, errors);
      this.checkExtraFields(object, keys, errors);
    }

    return errors;
  }

  private static checkMissingFields(object: { [key: string]: string }, keys: string[], errors: string[]) {
    if (!object.caseName) errors.push(`'caseName' is missing`);
    if (!object.jury) errors.push(`'jury' is missing`);
    if (!object.caseNumber) errors.push(`'caseNumber' is missing`);
    if (!object.applicant) errors.push(`'applicant' is missing`);
    if (!object.userId) errors.push(`'userId' is missing`);
    if (!object.respondent) errors.push(`'respondent' is missing`);
    if (!object.type) errors.push(`'type' is missing`);
    if (!object.status) errors.push(`'status' is missing`);
  }

  private static checkFieldTypes(object: { [key: string]: string }, errors: string[]) {
    if (!Validators.isString(object.caseName)) errors.push('caseName should be a string');
    if (!Validators.isString(object.jury)) errors.push('jury should be a string');
    if (!Validators.isString(object.caseNumber)) errors.push('caseNumber should be a string');
    if (!Validators.isString(object.applicant)) errors.push('applicant should be a string');
    if (!Validators.isString(object.userId)) errors.push('userId should be a string');
    if (!Validators.isString(object.respondent)) errors.push('respondent should be a string');
  }

  private static checkEnumValues(object: { [key: string]: string }, errors: string[]) {
    if (!Validators.enums(object.type, CaseType)) errors.push('type is not valid');
    if (!Validators.enums(object.status, CaseStatus)) errors.push('status is not valid');
  }

  private static checkExtraFields(object: { [key: string]: string }, keys: string[], errors: string[]) {
    if (Object.values(object).length > CreateCaseDTO.length) {
      Object.keys(object)
        .filter((key) => !keys.includes(key))
        .forEach((key) => errors.push(`'${key}' should not exist`));
    }
  }
}
