import { Router } from 'express'
import AuthService from '../services/auth.service'
import { ILogin, IRegister } from '../types/types.d'

export default class AuthRoutes {
  static get routes(): Router {
    const router = Router()

    router.post('/register', (req, res) => {
      const data = req.body as IRegister
      const newUser = AuthService.register(data)
      res.status(201).json(newUser)
    })

    router.post('/login', (req, res) => {
      const data = req.body as ILogin
      const token = AuthService.login(data)
      res.status(200).json(token)
    })

    return router
  }
}
