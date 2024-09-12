import { Response, Request, NextFunction } from 'express'
import { UserService } from '../services/user.service'
import HttpError from '../config/errors'
import { HTTP_STATUS } from '../enums/enum'
import {
  LoginUserDTO,
  RegisterUserDTO,
  UpdatePasswordDTO,
  UpdateUserDTO,
  UserDTO,
} from '../dtos/user'
import { envs } from '../config'

export class UserController {
  constructor(private readonly userService: UserService) {}

  getUsers = (req: Request, res: Response, next: NextFunction) => {
    this.userService
      .getUsers()
      .then((users) => {
        res.status(201).json(users)
      })
      .catch((error: unknown) => next(error))
  }

  getUser = (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id
    if (!userId) throw new HttpError(400, HTTP_STATUS.BAD_REQUEST, 'Unauthorized')

    this.userService
      .getUserById(userId)
      .then((user) => {
        if (user) {
          res.status(201).json(UserDTO.create(user))
          return
        }
        res.status(201).json(user)
      })
      .catch((error: unknown) => next(error))
  }

  getUserInfo = (req: Request, res: Response, next: NextFunction) => {
    const { id: userId } = req.params
    if (!userId) throw new HttpError(400, HTTP_STATUS.BAD_REQUEST, 'Unauthorized')

    this.userService
      .getUserById(userId)
      .then((user) => {
        if (user) {
          res.status(201).json(UserDTO.create(user))
          return
        }
        res.status(201).json(user)
      })
      .catch((error: unknown) => next(error))
  }

  loginUser = (req: Request, res: Response, next: NextFunction) => {
    const [error, loginUserDto] = LoginUserDTO.create(req.body)
    if (error || !loginUserDto) throw new HttpError(400, HTTP_STATUS.BAD_REQUEST, error)
    const cookie = req.headers.cookie
    if (cookie) throw new HttpError(400, HTTP_STATUS.BAD_REQUEST, 'already logged in!')

    const cookieName = envs.nodeEnv === 'prod' ? (envs.jwtCookieName as string) : 'jwt-cookie'

    this.userService
      .loginUser(loginUserDto)
      .then(async ({ accessToken, refreshToken }) => {
        await this.userService.updateRefreshToken(loginUserDto.email, refreshToken)
        res.cookie(cookieName, refreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: 'none',
          maxAge: 3 * 60 * 1000,
        })
        res.status(200).json({ accessToken })
      })
      .catch((error: unknown) => next(error))
  }

  registerUser = (req: Request, res: Response, next: NextFunction) => {
    const [error, registerUserDto] = RegisterUserDTO.create(req.body)
    if (error || !registerUserDto) {
      throw new HttpError(400, HTTP_STATUS.BAD_REQUEST, error)
    }
    this.userService
      .registerUser(registerUserDto)
      .then((message) => res.status(201).json(message))
      .catch((error: unknown) => next(error))
  }

  logoutUser = (req: Request, res: Response, next: NextFunction) => {
    const cookieName = envs.nodeEnv === 'prod' ? (envs.jwtCookieName as string) : 'jwt-cookie'
    const cookie = req.headers.cookie
    if (!cookie) throw new HttpError(403, HTTP_STATUS.FORBIDDEN, 'cookie not found!')
    const refreshToken = cookie?.split('=')[1].split(';')[0]

    this.userService
      .deleteRefreshToken(refreshToken)
      .then(() => {
        res.clearCookie(cookieName, {
          httpOnly: true,
          secure: true,
          sameSite: 'none',
        })
        res.status(200).json({ message: 'logged out successfully!' })
      })
      .catch((error) => next(error))
  }

  updatePassword = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    const [error, updatePasswordDto] = UpdatePasswordDTO.create(req.body)
    if (error || !updatePasswordDto) throw new HttpError(400, HTTP_STATUS.BAD_REQUEST, error)

    this.userService
      .updatePassword(id, updatePasswordDto)
      .then((message) => res.status(201).json(message))
      .catch((error: unknown) => next(error))
  }

  updateUser = (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id
    const [error, updateUserDto] = UpdateUserDTO.create(req.body)
    if (error || !userId || !updateUserDto) throw new HttpError(401, HTTP_STATUS.BAD_REQUEST, error)

    this.userService
      .updateUser(userId, updateUserDto)
      .then((user) => {
        if (user) {
          res.status(201).json({ message: 'User updaeted successfully!' })
          return
        }
        res.status(201).json(user)
      })
      .catch((error: unknown) => next(error))
  }

  deleteUser = (req: Request, res: Response, next: NextFunction) => {
    const { id: userId } = req.params

    this.userService
      .deleteUser(userId)
      .then((user) => {
        res.status(201).json(user)
      })
      .catch((error: unknown) => next(error))
  }
}
