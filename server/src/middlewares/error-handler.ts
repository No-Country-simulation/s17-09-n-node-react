import { NextFunction, Request, Response } from 'express'
import HttpError from '../config/errors'

export default function errorHandler(
  err: HttpError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
): void {
  const statusCode = err.status || 500
  const message = err.message || 'Internal Server Error'
  const description = err.description || ''

  const errorResponse = {
    statusCode,
    error: {
      message,
      description,
    },
  }

  res.status(statusCode).json(errorResponse)
}
