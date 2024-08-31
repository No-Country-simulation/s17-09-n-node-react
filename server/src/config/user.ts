export interface IPayload {
  id: string
  role: string
}

declare module 'express' {
  export interface Request {
    user?: IPayload
  }
}
