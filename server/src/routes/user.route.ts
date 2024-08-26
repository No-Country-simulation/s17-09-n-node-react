import { Router } from 'express'
import UserService from '../services/user.service'

export default class UserRoutes {
  static get routes(): Router {
    const router = Router()

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    router.get('/', async (_req, res) => {
      const usersList = await UserService.getUsers()
      res.send(usersList)
    })
    return router
  }
}
