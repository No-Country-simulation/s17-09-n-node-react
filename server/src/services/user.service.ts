import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import { RegisterUserDTO } from '../dtos/user/register-dto.user'
import { LoginUserDTO } from '../dtos/user/login-dto.user'
import HttpError from '../config/errors'
import { HTTP_STATUS } from '../enums/enum'
import { envs } from '../config'
import { IPayload } from '../config/user'
import { UpdatePasswordDTO } from '../dtos/user/password-dto.user'

const prisma = new PrismaClient()

export class UserService {
  async loginUser(loginUserDTO: LoginUserDTO): Promise<{ accessToken: string }> {
    const user = await prisma.user.findUnique({
      where: { email: loginUserDTO.email },
    })
    // TODO: update error
    if (!user) throw new HttpError(404, HTTP_STATUS.NOT_FOUND, 'User not found!')

    const verify = await bcrypt.compare(loginUserDTO.password, user.password)

    if (!verify) throw new HttpError(401, HTTP_STATUS.UNAUTHORIZED, `Passwords don't match!`)

    const payload: IPayload = {
      id: user.id,
      role: user.role,
    }

    const secret = envs.nodeEnv === 'prod' ? (envs.jwtAccessSecret as string) : 'secret'

    const expiration = envs.nodeEnv === 'prod' ? (envs.jwtAccessExpiration as string) : '15m'

    const accessToken = jwt.sign(payload, secret, { expiresIn: expiration })

    // TODO: implement auth
    return { accessToken: accessToken }
  }

  async registerUser(registerUserDto: RegisterUserDTO) {
    const userExists = await prisma.user.findUnique({
      where: { email: registerUserDto.email },
    })

    // TODO: update error
    if (userExists) throw new HttpError(409, HTTP_STATUS.CONFLICT, 'User already exists! ')

    // TODO: implement auth
    registerUserDto.password = await bcrypt.hash(registerUserDto.password, 10)

    await prisma.user.create({ data: registerUserDto })

    return { message: 'User successfully registered!' }
  }

  async updatePassword(id: string, updatePasswordDto: UpdatePasswordDTO) {
    const userFound = await prisma.user.findUnique({
      where: { id: id },
    })

    if (!userFound) throw new HttpError(404, HTTP_STATUS.NOT_FOUND, 'User not found!')

    const verify = await bcrypt.compare(updatePasswordDto.currentPassword, userFound.password)

    if (!verify) throw new HttpError(403, HTTP_STATUS.FORBIDDEN, 'Current password invalid')
    if (updatePasswordDto.currentPassword === updatePasswordDto.newPassword)
      throw new HttpError(400, HTTP_STATUS.BAD_REQUEST, 'The passwords are equal')

    await prisma.user.update({
      where: { id: id },
      data: {
        password: updatePasswordDto.newPassword,
      },
    })

    return { message: 'Passwords successfully changed' }
  }
}
