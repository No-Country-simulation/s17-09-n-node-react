import { Router } from 'express'
import { UserService } from '../services/user.service'
import { UserController } from '../controller/user.controller'
import errorHandler from '../middlewares/error-handler'

export default class UserRoutes {
  static get routes(): Router {
    const router = Router()

    const userService = new UserService()
    const controller = new UserController(userService)

    router.get('/', controller.getUsers, errorHandler)
    router.post('/login', controller.loginUser, errorHandler)
    router.post('/register', controller.registerUser, errorHandler)

    return router
  }
}
