import { Request, Response, NextFunction } from 'express'
import { HTTP_STATUS, ROLE } from '../enums/enum'
import HttpError from '../config/errors'

export default function rolesHandler(...roles: (string | ROLE[])[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const role = req?.user?.role
    if (roles.includes(role as string)) {
      next()
    } else {
      throw new HttpError(401, HTTP_STATUS.UNAUTHORIZED, 'Your role is wrong')
    }
  }
}
