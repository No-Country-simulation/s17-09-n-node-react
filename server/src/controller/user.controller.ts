import { Response, Request, NextFunction } from 'express'
import { UserService } from '../services/user.service'
import { RegisterUserDTO } from '../dtos/user/register-dto.user'
import { LoginUserDTO } from '../dtos/user/login-dto.user'
import HttpError from '../config/errors'
import { HTTP_STATUS } from '../enums/enum'
import { UpdatePasswordDTO } from '../dtos/user/update-dto'

export class UserController {
  constructor(private readonly userService: UserService) {}

  getUsers(req: Request, res: Response) {
    res.status(200).json(['Maria', 'Louis', 'Jacob'])
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
}
