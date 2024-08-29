import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import { RegisterUserDTO } from '../dtos/user/register-dto.user'
import { LoginUserDTO } from '../dtos/user/login-dto.user'
import HttpError from '../config/errors'
import { HTTP_STATUS } from '../enums/enum'
import { IJwtPayload } from '../types/types'
import { envs } from '../config'

const prisma = new PrismaClient()

export class UserService {
  async loginUser(
    loginUserDTO: LoginUserDTO,
  ): Promise<{ accessToken: string }> {
    const user = await prisma.user.findUnique({
      where: { email: loginUserDTO.email },
    })
    // TODO: update error
    if (!user) throw new HttpError(404, HTTP_STATUS.NOT_FOUND, 'User not found')

    const verify = await bcrypt.compare(loginUserDTO.password, user.password)

    if (!verify)
      throw new HttpError(
        401,
        HTTP_STATUS.UNAUTHORIZED,
        `The passwords don't match`,
      )

    const payload: IJwtPayload = {
      id: user.id,
      role: user.role,
    }

    const secret =
      envs.nodeEnv === 'prod' ? (envs.jwtAccessSecret as string) : 'secret'
    const accessToken = jwt.sign(payload, secret, { expiresIn: '60s' })

    // TODO: implement auth
    return { accessToken: accessToken }
  }

  async registerUser(registerUserDto: RegisterUserDTO) {
    const userExists = await prisma.user.findUnique({
      where: { email: registerUserDto.email },
    })

    // TODO: update error
    if (userExists)
      throw new HttpError(409, HTTP_STATUS.CONFLICT, 'User already exists')

    // TODO: implement auth
    registerUserDto.password = await bcrypt.hash(registerUserDto.password, 10)

    return await prisma.user.create({ data: registerUserDto })
  }
}
