import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import { IJwtPayload, ILogin, IRegister } from '../types/types'

export default class AuthService {
  static async register(data: IRegister): Promise<IRegister> {
    try {
      data.password = await bcrypt.hash(data.password, 10)
      return data
    } catch (error) {
      throw new Error('error')
    }
  }

  static async login(data: ILogin): Promise<string | null> {
    const email = 'correo@correo.com'
    const password =
      '$2b$10$8A96ciKsLK8JcV0ZQuUrNO.opLGV2F.izWmeyIOdH/eMYA5eU9jJO'
    const verify = await bcrypt.compare(data.password, password)
    if (!verify && data.email === email) {
      const secret = process.env.JWT_ACCESS_SECRET
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
