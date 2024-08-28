import { Router } from 'express'
import { UserService } from '../services/user.service'
import { UserController } from '../controller/user.controller'

export default class UserRoutes {
  static get routes(): Router {
    const router = Router()

    const userService = new UserService()
    const controller = new UserController(userService)

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    router.get('/', async (_req, res) => {
      const usersList = await UserService.getUsers()
      res.send(usersList)
    })

    router.post('/login', controller.loginUser)
    router.post('/register', controller.registerUser)
    return router
  }
}
