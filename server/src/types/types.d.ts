export interface CaseData {
  name: string
  jury: string
  number: number
  applicant: string
  respondent: string
  type: string
}

export interface ILogin {
  email: string
  password: string
}

export interface IRegister extends ILogin {
  confirmPassword: string
}

export interface IJwtPayload {
  id: string
  role: string
}
