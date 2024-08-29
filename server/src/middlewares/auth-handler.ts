import { Request, Response, NextFunction } from 'express'
import * as jwt from 'jsonwebtoken'
import { envs } from '../config'
import HttpError from '../config/errors'
import { HTTP_STATUS } from '../enums/enum'
import { IPayload } from '../config/user'

export default function authHandler(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const secret =
      envs.nodeEnv === 'prod' ? (envs.jwtAccessSecret as string) : 'secret'
    const [type, token] = req.headers.authorization?.split(' ') ?? []
    if (type == 'Bearer' && token) {
      const payload = jwt.verify(token, secret)
      req.user = payload as IPayload
      return next()
    } else {
      throw new HttpError(
        401,
        HTTP_STATUS.UNAUTHORIZED,
        'The jwt is not provided',
      )
    }
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      next(new HttpError(403, HTTP_STATUS.FORBIDDEN, error.message))
    } else if (error instanceof jwt.JsonWebTokenError) {
      next(new HttpError(401, HTTP_STATUS.UNAUTHORIZED, error.message))
    } else next(error)
  }
}
