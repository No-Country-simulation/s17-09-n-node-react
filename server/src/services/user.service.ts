import { PrismaClient } from '@prisma/client'
import { RegisterUserDTO } from '../dtos/user/register-dto.user'

const prisma = new PrismaClient()

export class UserService {
  static async getUsers(): Promise<string[]> {
    return ['Maria', 'Louis', 'Jacob']
  }

  async registerUser(registerUserDto: RegisterUserDTO) {
    const userExists = await prisma.user.findUnique({
      where: { email: registerUserDto.email },
    })

    // TODO: update error
    if (userExists) throw new Error('User already exists')

    return await prisma.user.create({ data: registerUserDto })
  }
}
