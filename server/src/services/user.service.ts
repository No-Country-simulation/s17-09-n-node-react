import { PrismaClient } from '@prisma/client'
import { RegisterUserDTO } from '../dtos/user/register-dto.user'
import { LoginUserDTO } from '../dtos/user/login-dto.user'

const prisma = new PrismaClient()

export class UserService {
  static async getUsers(): Promise<string[]> {
    return ['Maria', 'Louis', 'Jacob']
  }

  async loginUser(loginUserDTO: LoginUserDTO) {
    const user = await prisma.user.findUnique({
      where: { email: loginUserDTO.email },
    })
    // TODO: update error
    if (!user) throw new Error('User does not exist')

    // TODO: implement auth
    return user
  }

  async registerUser(registerUserDto: RegisterUserDTO) {
    const userExists = await prisma.user.findUnique({
      where: { email: registerUserDto.email },
    })

    // TODO: update error
    if (userExists) throw new Error('User already exists')

    // TODO: implement auth

    return await prisma.user.create({ data: registerUserDto })
  }
}
