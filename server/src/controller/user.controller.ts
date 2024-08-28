import { Response, Request } from 'express'
import { UserService } from '../services/user.service'
import { RegisterUserDTO } from '../dtos/user/register-dto.user'

export class UserController {
  constructor(private readonly userService: UserService) {}

  private handleError = (error: unknown, res: Response) => {
    // eslint-disable-next-line no-console
    console.log(`${error}`)
    return res.status(500).json({ error: 'Internal server error' })
  }

  registerUser = (req: Request, res: Response) => {
    const [error, registerUserDto] = RegisterUserDTO.create(req.body)
    if (error || !registerUserDto) return res.status(400).json({ error })

    this.userService
      .registerUser(registerUserDto)
      // TODO: update type
      .then((user: unknown) => res.status(201).json(user))
      .catch((error: unknown) => this.handleError(error, res))
  }
}
