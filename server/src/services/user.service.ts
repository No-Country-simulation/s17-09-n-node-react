import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import HttpError from '../config/errors'
import { HTTP_STATUS } from '../enums/enum'
import { envs } from '../config'
import { IPayload } from '../config/user'
import { LoginUserDTO, RegisterUserDTO, UpdateUserDTO, UpdatePasswordDTO } from '../dtos/user'

const prisma = new PrismaClient()

export class UserService {
  async loginUser(
    loginUserDTO: LoginUserDTO,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await prisma.user.findUnique({
      where: { email: loginUserDTO.email },
    })

    if (!user) throw new HttpError(404, HTTP_STATUS.NOT_FOUND, 'User not found!')

    const verify = await bcrypt.compare(loginUserDTO.password, user.password)

    if (!verify) throw new HttpError(401, HTTP_STATUS.UNAUTHORIZED, `Passwords don't match!`)

    const payload: IPayload = {
      id: user.id,
      role: user.role,
    }

    const accessTokenSecret = envs.nodeEnv === 'prod' ? (envs.jwtAccessSecret as string) : 'secret'
    const refreshTokenSecret =
      envs.nodeEnv === 'prod' ? (envs.jwtRefreshSecret as string) : 'secret'

    const accessJwtExpiration =
      envs.nodeEnv === 'prod' ? (envs.jwtAccessExpiration as string) : '15m'
    const refreshJwtExpiration =
      envs.nodeEnv === 'prod' ? (envs.jwtRefreshExpiration as string) : '3h'

    const accessToken = jwt.sign(payload, accessTokenSecret, { expiresIn: accessJwtExpiration })
    const refreshToken = jwt.sign(payload, refreshTokenSecret, { expiresIn: refreshJwtExpiration })

    return { accessToken: accessToken, refreshToken: refreshToken }
  }

  async registerUser(registerUserDto: RegisterUserDTO) {
    const userExists = await prisma.user.findUnique({
      where: { email: registerUserDto.email },
    })

    if (userExists) throw new HttpError(409, HTTP_STATUS.CONFLICT, 'User already exists! ')

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

  async updateRefreshToken(email: string, refreshToken: string) {
    const foundUser = await prisma.user.findUnique({
      where: { email: email },
    })

    if (!foundUser) throw new HttpError(404, HTTP_STATUS.NOT_FOUND)

    const refreshTokenArray = foundUser.refreshToken.filter((rt) => rt !== refreshToken)

    const newRefreshTokenArray = [...refreshTokenArray, refreshToken]

    await prisma.user.update({
      where: { id: foundUser.id },
      data: { refreshToken: newRefreshTokenArray },
    })
  }

  async deleteRefreshToken(refreshToken: string) {
    const foundUser = await prisma.user.findFirst({
      where: { refreshToken: { has: refreshToken } },
    })

    if (!foundUser) throw new HttpError(404, HTTP_STATUS.NOT_FOUND)

    const refreshTokenArray = foundUser.refreshToken.filter((rt) => rt !== refreshToken)

    const newRefreshTokenArray = [...refreshTokenArray]

    await prisma.user.update({
      where: { id: foundUser.id },
      data: { refreshToken: newRefreshTokenArray },
    })
  }
}
