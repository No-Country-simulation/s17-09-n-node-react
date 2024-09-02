import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import { RegisterUserDTO } from '../dtos/user/register-dto.user'
import { LoginUserDTO } from '../dtos/user/login-dto.user'
import HttpError from '../config/errors'
import { HTTP_STATUS } from '../enums/enum'
import { envs } from '../config'
import { IPayload } from '../config/user'
import { UpdateUserDTO } from '../dtos/user/update-dto.user'

const prisma = new PrismaClient()

export class UserService {
  async loginUser(
    loginUserDTO: LoginUserDTO,
  ): Promise<{ accessToken: string }> {
    const user = await prisma.user.findUnique({
      where: { email: loginUserDTO.email },
    })
    if (!user) throw new HttpError(404, HTTP_STATUS.NOT_FOUND, 'User not found')

    const verify = await bcrypt.compare(loginUserDTO.password, user.password)

    if (!verify)
      throw new HttpError(
        401,
        HTTP_STATUS.UNAUTHORIZED,
        `The passwords don't match`,
      )

    const payload: IPayload = {
      id: user.id,
      role: user.role,
    }

    const secret =
      envs.nodeEnv === 'prod' ? (envs.jwtAccessSecret as string) : 'secret'

    const expiration =
      envs.nodeEnv === 'prod' ? (envs.jwtAccessExpiration as string) : '15m'

    const accessToken = jwt.sign(payload, secret, { expiresIn: expiration })

    return { accessToken: accessToken }
  }

  async registerUser(registerUserDto: RegisterUserDTO) {
    const userExists = await prisma.user.findUnique({
      where: { email: registerUserDto.email },
    })

    if (userExists)
      throw new HttpError(409, HTTP_STATUS.CONFLICT, 'User already exists')

    registerUserDto.password = await bcrypt.hash(registerUserDto.password, 10)

    return await prisma.user.create({ data: registerUserDto })
  }

  async getUsers() {
    return await prisma.user.findMany()
  }

  async getUserById(id: string) {
    return await prisma.user.findUnique({ where: { id } })
  }

  async updateUser(id: string, updateUserDto: UpdateUserDTO) {
    return await prisma.user.update({
      where: { id },
      data: updateUserDto,
    })
  }

  async deleteUser(id: string) {
    return await prisma.user.delete({ where: { id } })
  }
}
