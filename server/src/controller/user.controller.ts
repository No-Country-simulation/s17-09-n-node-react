import { Response, Request, NextFunction } from 'express'
import { UserService } from '../services/user.service'
import { RegisterUserDTO } from '../dtos/user/register-dto.user'
import { LoginUserDTO } from '../dtos/user/login-dto.user'
import HttpError from '../config/errors'
import { HTTP_STATUS } from '../enums/enum'
import { UpdatePasswordDTO } from '../dtos/user/password-dto.user'

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

  getUserById = (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params

    // TODO: update
    if (req.user?.role !== ROLE.ADMIN) {
      if (userId !== req.user?.id) {
        throw new HttpError(401, HTTP_STATUS.UNAUTHORIZED, 'Unauthorized')
      }
    }

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

    this.userService
      .loginUser(loginUserDto)
      .then((accessToken) => {
        res.status(201).json(accessToken)
      })
      .catch((error: unknown) => next(error))
  }

  registerUser = (req: Request, res: Response, next: NextFunction) => {
    const [error, registerUserDto] = RegisterUserDTO.create(req.body)
    if (error || !registerUserDto) throw new HttpError(400, HTTP_STATUS.BAD_REQUEST, error)

    this.userService
      .registerUser(registerUserDto)
      .then((message) => res.status(201).json(message))
      .catch((error: unknown) => next(error))
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
    const { userId } = req.params
    const updateUserDto = UpdateUserDTO.create(req.body)

    // TODO: update
    if (req.user?.role !== ROLE.ADMIN) {
      if (userId !== req.user?.id) {
        throw new HttpError(401, HTTP_STATUS.UNAUTHORIZED, 'Unauthorized')
      }
    }

    this.userService
      .updateUser(userId, updateUserDto)
      .then((user) => {
        if (user) {
          res.status(201).json(UserDTO.create(user))
          return
        }
        res.status(201).json(user)
      })
      .catch((error: unknown) => next(error))
  }

  deleteUser = (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params

    this.userService
      .deleteUser(userId)
      .then((user) => {
        res.status(201).json(user)
      })
      .catch((error: unknown) => next(error))
  }
}
