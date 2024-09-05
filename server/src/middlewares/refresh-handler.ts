import { Request, Response, NextFunction } from 'express'
import { PrismaClient } from '@prisma/client'
import * as jwt from 'jsonwebtoken'
import HttpError from '../config/errors'
import { HTTP_STATUS } from '../enums/enum'
import { envs } from '../config'
import { IPayload } from '../config/user'

export default async function refreshHandler(req: Request, res: Response, next: NextFunction) {
  const cookieName = envs.nodeEnv === 'prod' ? (envs.jwtCookieName as string) : 'jwt-cookie'
  const accessSecret = envs.nodeEnv === 'prod' ? (envs.jwtAccessSecret as string) : 'secret'
  const refreshSecret = envs.nodeEnv === 'prod' ? (envs.jwtRefreshSecret as string) : 'secret'
  const accessJwtExpiration = envs.nodeEnv === 'prod' ? (envs.jwtAccessExpiration as string) : '15m'
  const refreshJwtExpiration =
    envs.nodeEnv === 'prod' ? (envs.jwtRefreshExpiration as string) : '3h'
  const prisma = new PrismaClient()
  try {
    const cookie = req.headers.cookie
    if (!cookie) throw new HttpError(403, HTTP_STATUS.FORBIDDEN, 'cookie not found!')
    const refreshToken = cookie?.split('=')[1].split(';')[0]

    res.clearCookie(cookieName, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    })

    const foundUser = await prisma.user.findFirst({
      where: { refreshToken: { has: refreshToken } },
    })

    if (!foundUser) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
      jwt.verify(refreshToken, refreshSecret, async (err: any, decoded: any) => {
        if (err) throw new HttpError(403, HTTP_STATUS.FORBIDDEN, 'error on decoding!')
        await prisma.user.update({
          where: { id: decoded.id },
          data: {
            refreshToken: [],
          },
        })
      })
      throw new HttpError(403, HTTP_STATUS.FORBIDDEN, 'hacked user!')
    }

    const newRefreshTokenArray = foundUser.refreshToken.filter((rt) => rt !== refreshToken)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    jwt.verify(refreshToken, refreshSecret, async (err: any, decoded: any) => {
      if (err) {
        foundUser.refreshToken = [...newRefreshTokenArray]
        await prisma.user.update({
          where: { id: foundUser.id },
          data: {
            refreshToken: foundUser.refreshToken,
          },
        })
      }
      const payload: IPayload = {
        id: decoded.id,
        role: decoded.role,
      }
      if (err || foundUser.id !== decoded.id)
        throw new HttpError(403, HTTP_STATUS.FORBIDDEN, 'hacked user!')
      const accessToken = jwt.sign(payload, accessSecret, { expiresIn: accessJwtExpiration })
      const newRefreshToken = jwt.sign(payload, refreshSecret, {
        expiresIn: refreshJwtExpiration,
      })
      foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken]
      await prisma.user.update({
        where: { id: foundUser.id },
        data: {
          refreshToken: foundUser.refreshToken,
        },
      })
      res.cookie(cookieName, newRefreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'none',
        maxAge: 3 * 60 * 1000,
      })
      res.status(201).json({ accessToken: accessToken })
    })
  } catch (error) {
    next(error)
  }
}
