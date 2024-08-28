import { Router } from 'express'
import AuthService from '../services/auth.service'
import { ILogin, IRegister } from '../types/types.d'

export default class AuthRoutes {
  static get routes(): Router {
    const router = Router()

    router.post('/register', (req, res) => {
      const data = req.body as IRegister
      const newUser = AuthService.register(data)
      newUser
        .then((data) => {
          res.status(201).json(data)
        })
        .catch((error) => {
          res.status(401).json(error)
        })
    })

    router.post('/login', (req, res) => {
      const data = req.body as ILogin
      const token = AuthService.login(data)
      token.then((data) => {
        res.status(201).json(data)
      })
    })

    return router
  }
}
