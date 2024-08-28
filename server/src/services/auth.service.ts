import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import { IJwtPayload, ILogin, IRegister } from '../types/types'

export default class AuthService {
  static async register(data: IRegister): Promise<IRegister> {
    try {
      data.password = await bcrypt.hash(data.password, 10)
      return data
    } catch (error) {
      throw new Error('Error')
    }
  }

  static async login(data: ILogin): Promise<string | null> {
    const verify = await bcrypt.compare(data.password, 'password')
    const secret =
      process.env.NODE_ENV === 'prod' ? process.env.JWT_ACCESS_SECRET : 'secret'
    if (!verify) {
      const payload: IJwtPayload = {
        id: 1,
        role: 'normal',
      }
      const accessToken = jwt.sign(payload, secret as string, {
        expiresIn: '60s',
      })
      return accessToken
    }
    return null
  }
}
